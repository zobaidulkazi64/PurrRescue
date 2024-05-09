import { Request, Response, NextFunction } from "express";
import { UserCreateSchema } from "@/utils/schemas";
import prisma from "@/utils/prisma";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;

    const totalCount = await prisma.user.count(); // Total count of users

    const paginatedUsers = await prisma.user.findMany({
      take: limit,
      skip: offset,
    });

    if (paginatedUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      data: paginatedUsers,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;
