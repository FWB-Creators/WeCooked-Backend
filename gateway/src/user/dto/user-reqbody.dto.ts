export class UserLoginRequestBody {
  email: string;
  password: string;
}

export class UserSignUpRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
