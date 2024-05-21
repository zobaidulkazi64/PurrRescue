import prisma from "@/utils/prisma";
import { Request, Response, NextFunction } from "express";

const getEmails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emails = await prisma.email.findMany();

    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
};

export default getEmails;
