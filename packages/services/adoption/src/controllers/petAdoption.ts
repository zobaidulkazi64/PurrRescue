import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { PetAdoptionSchema } from "@/utils/schemas";
import axios from "axios";

const petAdoption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = PetAdoptionSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return next(parsedBody.error);
    }

    // Fetch the pet by id
    const pet = await prisma.pet.findUnique({
      where: {
        id: parsedBody.data.petId,
      },
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if the pet is already adopted

    const petAdoptionExists = await prisma.petAdoption.findFirst({
      where: {
        petId: parsedBody.data.petId,
      },
    })
    if (petAdoptionExists) {
      return res.status(400).json({ message: "Pet already adopted" });
    }

    // Fetch the user by id & from the user service
    const userId = parsedBody.data.userId;
    const userApiRes = await axios.get(
      `http://localhost:4000/api/users/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const user = userApiRes.data;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the adoption
    const adoption = await prisma.petAdoption.create({
      data: parsedBody.data,
    });

    res.status(201).json({
      message: "Adoption created successfully",
      data: adoption,
    });
  } catch (error) {
    next(error);
  }
};

export default petAdoption;
