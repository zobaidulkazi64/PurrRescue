import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { AccessTokenSchema } from "@/utils/schemas";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body
    const accessToken = req.headers.authorization?.split(" ")[1];

    console.log(accessToken);
  } catch (error) {
    next(error);
  }
};

export default authToken;
