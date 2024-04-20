import { PetColor, PetSize, PetCategory, PetGender } from "@prisma/client";
import { z } from "zod";

export const CreatePetSchema = z.object({
  userId: z.string(),
  name: z.string(),
  breed: z.string(),
  age: z.number().optional(),
  color: z.nativeEnum(PetColor),
  size: z.nativeEnum(PetSize),
  description: z.string().min(20).max(500),
  image: z.string().optional(),
  category: z.nativeEnum(PetCategory),
  gender: z.nativeEnum(PetGender),
});

export const PetAdoptionSchema = z.object({
  petId: z.string(),
  userId: z.string(),
  description: z.string(),
  status: z.string().optional(),
  size: z.string(),
  color: z.string(),
  age: z.string().optional(),
  breed: z.string(),
});
