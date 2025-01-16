interface IAuthLogin {
    email: string;
    phone: string;
    password: string;
}

interface IAuthSignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    loggedOnTime?: number;
}

export type { IAuthLogin, IAuthSignup, User };