import { Request, Response, NextFunction } from 'express';
import prisma from '@/utils/prisma';
import { EmailCreateSchema } from '@/utils/schemas';
import { defaultSender, transporter } from '@/config';