import { Document, model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Хеширование пароля перед сохранением
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Метод для сравнения паролей
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', UserSchema);
