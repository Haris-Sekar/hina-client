interface IAuthLogin {
    email: string;
    phone: string;
    password: string;
}

interface User {
    name: string;
    email: string;
    role: string;
    phone: number;
}

export type { IAuthLogin, User };