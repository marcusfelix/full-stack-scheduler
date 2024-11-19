import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function Auth(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers['x-auth'];

    if (!token) {
      throw new Error('auth header not found');
    }

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    req.user = decoded as User;

    next();
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
}