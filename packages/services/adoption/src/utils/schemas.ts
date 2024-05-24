import {
  PetColor,
  PetSize,
  PetCategory,
  PetGender,
  PetBreed,
} from "@prisma/client";
import { z } from "zod";

export const CreatePetSchema = z.object({
  userId: z.string(),
  name: z.string(),
  breed: z.nativeEnum(PetBreed),
  age: z.string().optional(),
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
  description: z.string().optional(),
  status: z.string().optional(),
  size: z.nativeEnum(PetSize),
  color: z.nativeEnum(PetColor),
  age: z.number(),
  breed: z.nativeEnum(PetBreed),
  category: z.nativeEnum(PetCategory),
});
