import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/config';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import setupSwagger from './swagger';

// Инициализация подключения к БД
connectDB().catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});

const app = express();

setupSwagger(app);

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api-v1/auth', authRoutes);
app.use('/api-v1/users', userRoutes);

// Health check endpoint
app.get('/api-v1/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    });
});

// Error handling middleware
app.use(errorHandler);

export default app;
