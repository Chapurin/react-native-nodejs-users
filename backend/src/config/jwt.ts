import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import config from './config';
import { AppError, ErrorType } from '../services/errorService';

export const generateToken = (userId: string): string => {
    try {
        const payload: JwtPayload = { userId };
        const secretOrPrivateKey: Secret = config.jwtSecret;
        const options: SignOptions = { expiresIn: config.jwtExpiresIn };
        
        return jwt.sign(payload, secretOrPrivateKey, options);
    } catch (error) {
        throw new AppError(ErrorType.INTERNAL, 'Token generation failed', error, 500);
    }
};

export const verifyToken = (token: string): { userId: string } => {
    try {
        return jwt.verify(token, config.jwtSecret) as { userId: string };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'Token expired', error, 401);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'Invalid token', error, 401);
        }
        throw new AppError(ErrorType.INTERNAL, 'Token verification failed', error, 500);
    }
};
