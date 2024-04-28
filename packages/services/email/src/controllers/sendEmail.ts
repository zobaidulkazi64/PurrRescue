import { Request, Response, NextFunction } from 'express';
import prisma from '@/utils/prisma';
import { EmailCreateSchema } from '@/utils/schemas';
import { defaultSender, transporter } from '@/config';




const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate input the req body
        const parsedBody = EmailCreateSchema.safeParse(req.body)

        if (!parsedBody.success) {
            return res.status(400).json(parsedBody.error.errors)
        }
    } catch (error) {
        next(error)
    }
}