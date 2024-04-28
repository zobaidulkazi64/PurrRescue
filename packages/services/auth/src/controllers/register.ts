import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { registerSchema } from "../utils/schemas";
import bcrypt from "bcryptjs";
import generateVerificationCode from "@/utils/generateVerificationCode";
import axios from "axios";



const UserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validation of request body
    const parsedBody = registerSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        error: parsedBody.error,
      });
    }

    // check if user already exists\\
    const existingUser = await prisma.authUser.findUnique({
      where: {
        email: parsedBody.data.email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, salt);

    // create auth user

    const user = await prisma.authUser.create({
      data: {
        ...parsedBody.data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        verified: true,
        createdAt: true,
      },
    });

    console.log(user);



    // generate verification code
    const code = generateVerificationCode();
    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
        expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
     }
    })

    console.log(code);

    // send verification code

    await axios.post('http:localhost:4003/emails/send', {
      recipient: user.email,
      subject: 'Verify your email',
      body: `Your verification code is: ${code}`,
      source: "user registration",
      
    })

    return res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default UserRegister;
