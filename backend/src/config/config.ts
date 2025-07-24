import dotenv from 'dotenv';
import { StringValue } from 'ms';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongoUri: string;
    jwtSecret: string;
    jwtExpiresIn: number | StringValue;
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/auth_app',
    jwtSecret: process.env.JWT_SECRET ?? 'your-secret-key',
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN as StringValue) ?? '1h',
};

export default config;
