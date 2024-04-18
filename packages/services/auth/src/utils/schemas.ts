import { z } from 'zod';


export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4)
})