import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../gateway/node_modules/.prisma/client';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
    console.log('Connected to the database');
  }
  getChef(): string {
    return 'Chef is here';
  }

  postSignUpChef(): string {
    return 'Chef is signed up';
  }
}
