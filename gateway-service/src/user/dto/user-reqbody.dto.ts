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
<<<<<<< HEAD

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
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
