import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { CreatePetSchema } from "@/utils/schemas";

const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = CreatePetSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return next(parsedBody.error);
    }

    // check if pet already exists
    const existingPet = await prisma.pet.findFirst({
      where: {
        name: parsedBody.data.name,
      },
    });
    if (existingPet) {
      return res.status(400).json({ message: "Pet already exists" });
    }

    // create pet
    const createdPet = await prisma.pet.create({
      data: parsedBody.data,
    });

    res.status(201).json({
      message: "Pet created successfully",
      data: createdPet,
    });
  } catch (error) {
    next(error);
  }
};

export default createPet;
