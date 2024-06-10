import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@/utils/prisma';
import { AccessTokenSchema } from '@/utils/schemas';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const parsedBody = AccessTokenSchema.safeParse(accessToken);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        error: parsedBody.error,
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.authUser.findUnique({
      where: {
        id: (decoded as any).id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authToken;
