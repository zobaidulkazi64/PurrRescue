import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.params
    const { id } = req.params;

    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({
      message: "Pet fetched successfully",
      data: pet,
    });
  } catch (error) {
    next(error);
  }
};

export default getPetById;
