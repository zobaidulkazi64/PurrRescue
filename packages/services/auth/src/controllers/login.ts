import { AccessTokenSchema } from "./../utils/schemas";
import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { loginSchema } from "../utils/schemas";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type LoginHistory = {
  userId: string;
  userAgent: string | undefined;
  ip: string | undefined;
  attempt: "SUCCESS" | "FAILED";
};

// create login history
const createLoginHistory = async (info: LoginHistory) => {
  await prisma.loginHistory.create({
    data: {
      userId: info.userId,
      userAgent: info.userAgent,
      ip: info.ip,
      attempt: info.attempt,
    },
  });
};

// login
const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validation of request body
    const parsedBody = loginSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        error: parsedBody.error,
      });
    }

    // ip address & user agent found
    const ip =
      (req.headers["x-forwarded-for"] as string) ||
      (req.socket.remoteAddress as string) ||
      req.ip;
    const userAgent = (req.headers["user-agent"] as string) || "";

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // compare password
    const isMatch = await bcrypt.compare(
      parsedBody.data.password,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check if user is active
    if (!user.status) {
      return res.status(400).json({ message: "User is not active" });
    }

    // generate access token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, name: user.name, role: user.role },
      (process.env.ACCESS_TOKEN_SECRET as string) || "my-secret",
      {
        expiresIn: "1h",
      }
    );

    await createLoginHistory({
      userId: user.id,
      userAgent,
      ip,
      attempt: "SUCCESS",
    });

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default UserLogin;
