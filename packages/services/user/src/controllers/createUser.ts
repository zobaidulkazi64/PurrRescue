import { Request, Response, NextFunction } from "express";
import { UserCreateSchema } from "@/utils/schemas";
import prisma from "@/utils/prisma";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body
    const parsedBody = UserCreateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.errors });
    }

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        authUserId: parsedBody.data.authUserId,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const createdUser = await prisma.user.create({
      data: parsedBody.data,
    });

    res.status(201).json(createdUser);
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default createUser;
