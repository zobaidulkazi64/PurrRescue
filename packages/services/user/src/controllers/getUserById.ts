import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import prisma from "@/utils/prisma";

// user by id

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.params
    const { id } = req.params;
    const field = req.query.field as string;

    let user: User | null = null;
    // check if user exists
    if (field === "authUserId") {
      user = await prisma.user.findUnique({
        where: {
          authUserId: id,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
    }
    //user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // response
    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });

    res;
  } catch (error) {
    next(error);
  }
};

export default getUserById;
