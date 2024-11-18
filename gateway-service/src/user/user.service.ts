import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { UserSignUpRequestBody } from './dto/user-reqbody.dto';
import { UserSignUpEventMsg } from '../../../lib/user/event-msg.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

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
}
