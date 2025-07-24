import { NextFunction, Request, Response } from 'express';
import { AppError } from '../services/errorService';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    AppError.handleError(res, err);
};
