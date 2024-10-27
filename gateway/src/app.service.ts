import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  constructor(
    @Inject('TEST_SERVICE') private readonly testClient: ClientProxy,
    @Inject('CHEF_SERVICE') private readonly chefClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: any): Observable<any> {
    this.users.push(createUserRequest);
    return this.testClient.emit('create user!!', createUserRequest);
  }

  getUsers(): Observable<any> {
    return this.testClient.send({ cmd: 'get users' }, {});
  }

  getChef(): Promise<any> {
    console.log('get chef service');
    return lastValueFrom(this.chefClient.send('chef', {}));
  }
}
