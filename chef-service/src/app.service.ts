import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '../../gateway/node_modules/.prisma/client';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  logger = new Logger('Chef Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }
  getChef(): Promise<any> {
    return this.chef.findMany();
  }

  async postSignUpChef(body: any): Promise<any> {
    const { name, email, lastName, username, password } = body[0];
    const payload = { name, email, lastName, username, password };

    try {
      await this.chef.create({ data: payload });
      return { message: 'Chef created successfully' };
    } catch (e) {
      console.error('Error creating chef:', e);
      throw e;
    }
  }
}
