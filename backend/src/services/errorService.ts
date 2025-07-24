import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export enum ErrorType {
    VALIDATION = 'VALIDATION',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    CONFLICT = 'CONFLICT',
    INTERNAL = 'INTERNAL',
    BAD_REQUEST = 'BAD_REQUEST',
}

export interface AppError {
    type: ErrorType;
    message: string;
    details?: any;
    statusCode: number;
}

export class AppError extends Error implements AppError {
    constructor(
        public type: ErrorType,
        public message: string,
        public details?: any,
        public statusCode: number = 500
    ) {
        super(message);
        this.statusCode = this.getStatusCode(type);
    }

    public static handleError(res: Response, error: unknown): Response {
        console.error(error);

        // Handle known error types
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                type: error.type,
                message: error.message,
                details: error.details,
            });
        }

        // Handle MongoDB duplicate key error
        if ((error as MongoError).code === 11000) {
            return res.status(409).json({
                success: false,
                type: ErrorType.CONFLICT,
                message: 'Duplicate key error',
                details: { field: (error as any).keyValue },
            });
        }

        // Handle Mongoose validation errors
        if (error instanceof MongooseError.ValidationError) {
            const details = Object.values(error.errors).map((err) => ({
                field: err.path,
                message: err.message,
            }));
            return res.status(400).json({
                success: false,
                type: ErrorType.VALIDATION,
                message: 'Validation failed',
                details,
            });
        }

        // Handle JWT errors
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false,
                type: ErrorType.UNAUTHORIZED,
                message: 'Invalid or expired token',
            });
        }

        // Default error handler
        return res.status(500).json({
            success: false,
            type: ErrorType.INTERNAL,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error : undefined,
        });
    }

    private getStatusCode(type: ErrorType): number {
        const statusMap = {
            [ErrorType.VALIDATION]: 400,
            [ErrorType.NOT_FOUND]: 404,
            [ErrorType.UNAUTHORIZED]: 401,
            [ErrorType.FORBIDDEN]: 403,
            [ErrorType.CONFLICT]: 409,
            [ErrorType.INTERNAL]: 500,
            [ErrorType.BAD_REQUEST]: 400,
        };
        return statusMap[type] || 500;
    }
}
