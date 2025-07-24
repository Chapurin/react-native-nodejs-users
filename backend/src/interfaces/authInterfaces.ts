export interface RegisterDTO {
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserResponse {
    _id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
