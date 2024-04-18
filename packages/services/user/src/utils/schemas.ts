import { z } from "zod";

export const UserCreateSchema = z.object({
  authUserId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export const UserUpdateSchema = UserCreateSchema.omit({
  authUserId: true,
}).partial();
