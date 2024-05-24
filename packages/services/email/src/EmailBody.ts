import { Request, Response, NextFunction } from "express";

const emailBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    res.status(200).json({
      message: "Email body fetched successfully",
      data: email,
    });
  } catch (error) {
    next(error);
  }
};

export default emailBody;
