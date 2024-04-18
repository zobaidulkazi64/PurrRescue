import { z } from "zod";

export const UserCreateSchema = z.object({
  authUserId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string().default("Gazipur, Dhaka"),
  city: z.string().default("Dhaka"),
  state: z.string().default("Dhaka"),
  country: z.string().default("Bangladesh"),
  postalCode: z.string().default("1000"),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  
});

export const UserUpdateSchema = UserCreateSchema.omit({
  authUserId: true,
}).partial();
