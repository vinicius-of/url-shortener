export interface SignInData {
    userId: string;
    email: string;
}

export interface AuthResult {
    accessToken: string;
    userId: string;
    email: string;
}

export interface Login {
    email: string;
    password: string;
}
