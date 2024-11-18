import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import {
  ProfileUpdateRequestBody,
  UserLoginRequestBody,
  UserSignUpRequestBody,
} from './dto/user-reqbody.dto';
import {
  UserSignUpEventMsg,
  UserLoginEventMsg,
  ProfileUpdateEventMsg,
} from '@lib/src/user/event-msg.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  getUser(userId: number): Observable<any> {
    const result = new Observable((observer) => {
      lastValueFrom(this.userClient.send('user/getUser', userId))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
    return result;
  }

  signup(userSignUpRequestBody: UserSignUpRequestBody): Observable<any> {
    const userSignUpEventMsg: UserSignUpEventMsg = {
      email: userSignUpRequestBody.email,
      password: userSignUpRequestBody.password,
      firstName: userSignUpRequestBody.firstName,
      lastName: userSignUpRequestBody.lastName,
    };

    const result = new Observable((observer) => {
      lastValueFrom(this.userClient.send('user/signup', userSignUpEventMsg))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });

    return result;
  }

  login(userLoginRequestBody: UserLoginRequestBody): Observable<any> {
    const userLoginEventMsg: UserLoginEventMsg = {
      email: userLoginRequestBody.email,
      password: userLoginRequestBody.password,
    };
    const result = new Observable((observer) => {
      lastValueFrom(this.userClient.send('user/login', userLoginEventMsg))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
    return result;
  }

  profileUpdate(
    profileUpdateRequestBody: ProfileUpdateRequestBody,
  ): Observable<any> {
    const userUpdateEventMsg: ProfileUpdateEventMsg = {
      userId: profileUpdateRequestBody.userId,
      name: profileUpdateRequestBody.name,
      surname: profileUpdateRequestBody.surname,
      userProfile: profileUpdateRequestBody.userProfile,
      sex: profileUpdateRequestBody.sex,
      password: profileUpdateRequestBody.password,
      userPhone: profileUpdateRequestBody.userPhone,
      userPayment: profileUpdateRequestBody.userPayment,
      userAddress: profileUpdateRequestBody.userAddress,
    };
    const result = new Observable((observer) => {
      lastValueFrom(
        this.userClient.send('user/profileUpdate', userUpdateEventMsg),
      )
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
    return result;
  }
}
