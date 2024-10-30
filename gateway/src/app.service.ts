import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import * as nats from 'nats';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  constructor(
    @Inject('TEST_SERVICE') private readonly testClient: ClientProxy,
    @Inject('CHEF_SERVICE') private readonly chefClient: ClientProxy,
  ) {}
  getHello(): string {
    return `Hello World! ${process.env.NATS_HOST}`;
  }

  async createUser(createUserRequest: any): Promise<void> {
    this.users.push(createUserRequest);
    return this.testClient.emit('create user!!', createUserRequest).toPromise();
  }

  getUsers(): Observable<any> {
    const headers = nats.headers();
    headers.set('x-version', '1.0.0');

    const record = new NatsRecordBuilder(':cat:').setHeaders(headers).build();
    return this.testClient.send('get users', record);
  }
}
