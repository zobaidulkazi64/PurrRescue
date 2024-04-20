import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { CreatePetSchema } from "@/utils/schemas";

const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = CreatePetSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return next(parsedBody.error);
    }
    // create pet
    const createdPet = await prisma.pet.create({
      data: parsedBody.data,
    });

    res.status(201).json({ pet: createdPet });
  } catch (error) {
    next(error);
  }
};

export default createPet;
