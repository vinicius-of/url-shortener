export interface SignInData {
    userId: string;
    email: string;
}

export interface AuthResult {
    accessToken: string;
    id: string;
    email: string;
    userId?: string;
}

export interface Login {
    email: string;
    password: string;
}
