import { z } from "zod";

export const CreatePetSchema = z.object({
  userId: z.string(),
  name: z.string(),
  breed: z.string().optional(),
  age: z.number().optional(),
  color: z.string(),
  size: z.string().default("Medium"),
  description: z.string().min(20).max(500),
  image: z.string().optional(),
  category: z.string().optional(),
  gender: z.string().optional(),
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
