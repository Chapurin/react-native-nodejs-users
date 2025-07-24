import mongoose from 'mongoose';
import config from './config';
import { AppError, ErrorType } from '../services/errorService';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new AppError(ErrorType.INTERNAL, 'Database connection failed', error, 500);
    }
};

// Обработчик ошибок подключения после первоначального успешного подключения
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection lost:', error);
    throw new AppError(ErrorType.INTERNAL, 'Database connection lost', error, 500);
});
