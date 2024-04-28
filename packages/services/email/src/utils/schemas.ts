import { z } from 'zod';

export const emailCreateSchema = z.object({
	sender: z.string().optional(),
	recipient: z.string(),
	subject: z.string(),
	body: z.string(),
	source: z.string().optional()
});