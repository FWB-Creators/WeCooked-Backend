export declare class UserSignUpEventMsg {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class UserSignUpEventResponse {
    token: string;
    userData: any;
    status: string;
    statusCode: number;
}
