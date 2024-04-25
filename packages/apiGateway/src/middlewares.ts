import axios from "axios";
import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { data } = await axios.post(
        `${process.env.AUTH_URL}/auth/validate`,
      )

      req.body = { ...req.body, ...data };

    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const middleware = {
  auth,
};

export default middleware;
