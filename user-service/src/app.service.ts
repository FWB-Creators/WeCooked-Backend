import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  UserSignUpEventMsg,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
// import { getSnippetCode } from '@lib/One';
// import { SampleDto } from '@lib/Test.dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  constructor(private jwtService: JwtService) {
    super();
  }
  logger = new Logger('User Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async signUpUser(
    payload: UserSignUpEventMsg,
  ): Promise<UserSignUpEventResponse> {
    try {
      const result = await this.user.create({
        data: {
          userEmail: payload.email,
          password: payload.password,
          username: `${payload.firstName}_${payload.lastName}_${Date.now()}`,
          name: payload.firstName,
          surname: payload.lastName,
          userProfile: 'https://via.placeholder.com/150',
        },
      });
      const jwtPayload = {
        userId: result.userId,
        userEmail: result.userEmail,
        username: result.username,
      };
      const response: UserSignUpEventResponse = {
        token: this.jwtService.sign(jwtPayload),
        userData: result,
        status: 'User registered successfully',
        statusCode: 201,
      };
      return response;
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }
}
