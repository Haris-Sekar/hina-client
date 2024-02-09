interface IAuthLogin {
    email: string;
    phone: string;
    password: string;
}

interface User {
    userId: number;
    name: string;
    email: string;
    phone: number;
    loggedOnTime: number;
}

export type { IAuthLogin, User };