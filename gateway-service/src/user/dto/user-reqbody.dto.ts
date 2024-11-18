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

export class ProfileUpdateRequestBody {
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
