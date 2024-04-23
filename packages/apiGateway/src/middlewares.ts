import axios from "axios";
import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const middleware = {
  auth,
};

export default middleware;
