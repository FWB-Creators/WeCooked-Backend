import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: any): string {
    console.log('create user!! - test service', createUserRequest);
    return 'User created!';
  }
}
