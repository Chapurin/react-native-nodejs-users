import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/User';
import { generateToken } from '../config/jwt';
import { LoginDTO, RegisterDTO } from '../interfaces/authInterfaces';
import { AppError, ErrorType } from '../services/errorService';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация пользователей
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Ошибка валидации
 */
export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError(ErrorType.VALIDATION, 'Validation failed', errors.array(), 400);
        }

        const { email, password }: RegisterDTO = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError(ErrorType.CONFLICT, 'User already exists', { email }, 409);
        }

        const user = new User({ email, password });
        await user.save();

        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            data: { token },
        });
    } catch (error) {
        AppError.handleError(res, error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError(ErrorType.VALIDATION, 'Validation failed', errors.array(), 400);
        }

        const { email, password }: LoginDTO = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'Invalid credentials', null, 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new AppError(ErrorType.UNAUTHORIZED, 'Invalid credentials', null, 401);
        }

        const token = generateToken(user._id.toString());

        res.json({
            success: true,
            data: { token },
        });
    } catch (error) {
        AppError.handleError(res, error);
    }
};
