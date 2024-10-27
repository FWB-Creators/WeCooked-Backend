import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getChef(): string {
    return 'Chef is here';
  }

  postSignUpChef(): string {
    return 'Chef is signed up';
  }
}
