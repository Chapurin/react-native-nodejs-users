import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController';

const router = Router();

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Please include a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please include a valid email'),
        body('password').exists().withMessage('Password is required'),
    ],
    login
);

export default router;
