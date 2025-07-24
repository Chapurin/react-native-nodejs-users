import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';
import { User } from '../models/User';
import { AppError, ErrorType } from '../services/errorService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'No token provided', null, 401);
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'User not found', null, 401);
        }

        req.user = user;
        next();
    } catch (error) {
        AppError.handleError(res, error);
    }
};
