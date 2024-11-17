import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserSignUpEventMsg } from '../../lib/user/event-msg.dto';
import { PrismaClient } from '@prisma/client';
// import { getSnippetCode } from '@lib/One';
// import { SampleDto } from '@lib/Test.dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  logger = new Logger('User Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async signUpUser(payload: UserSignUpEventMsg): Promise<any> {
    const result = await this.user.create({
      data: {
        userEmail: payload.email,
        password: payload.password,
        username: `${payload.firstName}_${payload.lastName}_${Date.now()}`,
      },
    });
    console.log(result);

    return Promise.resolve('User signed up!');
  }
}
