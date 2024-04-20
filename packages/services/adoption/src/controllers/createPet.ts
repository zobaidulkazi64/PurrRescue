import { CreatePetSchema } from "@/utils/schemas";
import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";

const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = CreatePetSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.errors });
    }

    // const { userId } = parsedBody.data;

    co

    // check if pet already exists
    // const existingPet = await prisma.pet.findFirst({
    //   where: {
    //     name: parsedBody.data.name,
    //   },
    // });

    // if (existingPet) {
    //   return res.status(400).json({ message: "Pet already exists" });
    // }

    //create pet
    // const createdPet = await prisma.pet.create({
    //   data: parsedBody.data,
    // });

    console.log(parsedBody.data);

    res.status(201).json({
      message: "Pet created successfully",
      pet: parsedBody.data,
    });
  } catch (error) {
    next(error);
  }
};

export default createPet;
