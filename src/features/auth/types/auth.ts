export interface LoginCredentials {
    email: string;
    password: string;
}

export type AuthenticationCredentials = LoginCredentials;

export interface RegistrationCredentials {
    email: string;
    password: string;
    confirmPassword: string;
}
