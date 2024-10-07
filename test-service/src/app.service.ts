import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddUserRequest } from './interface/type';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(
    createUserRequest: AddUserRequest,
  ): Promise<Record<string, any>> {
    // const { name, email } = createUserRequest; // Destructure the object
    console.log('create user!! - test service', createUserRequest);
    console.log(createUserRequest);
    console.log(
      'create user!! - test service',
      createUserRequest.name,
      createUserRequest.email,
    );

    // Wait until parameters are provided

    return this.user.create({
      data: {
        name: createUserRequest.name,
        email: createUserRequest.email,
      },
    });
  }

  async getUsers(): Promise<Record<string, any>[]> {
    return await this.user.findMany();
  }
}
