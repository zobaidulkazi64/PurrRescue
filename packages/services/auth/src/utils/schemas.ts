import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const LoginHistorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  ip: z.string(),
  userAgent: z.string(),
  attempt: z.enum(["SUCCESS", "FAILED"]),
  createdAt: z.date(),
});

export const AccessTokenSchema = z.object({
  accessToken: z.string(),
});
