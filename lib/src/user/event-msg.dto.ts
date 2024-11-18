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

export class UserLoginEventMsg {
    email: string;
    password: string;
}

export class UserLoginEventResponse {
    token: string;
    userData: any;
    status: string;
    statusCode: number;
}

export class ProfileUpdateEventMsg {
    userId: number;
    name: string;
    surname: string;
    userProfile: string;
    sex: string;
    password: string;
    userPhone: string;
    userPayment: string;
    userAddress: string;
}

export class ProfileUpdateEventResponse {
    status: string;
    statusCode: number;
}
