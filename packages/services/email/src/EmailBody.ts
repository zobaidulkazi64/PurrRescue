import { Request, Response, NextFunction } from "express";

const emailBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    console.log(email);
  } catch (error) {
    next(error);
  }
};

export default emailBody;
