export class UserSignUpEventMsg {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class UserSignUpEventResponse {
    token: string;
    userData: any;
    status: string;
    statusCode: number;
}