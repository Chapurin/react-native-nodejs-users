import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppError, ErrorType } from '../services/errorService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password -__v');

        if (!users || users.length === 0) {
            throw new AppError(ErrorType.NOT_FOUND, 'No users found', null, 404);
        }

        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        AppError.handleError(res, error);
    }
};
