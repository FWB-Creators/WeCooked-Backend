import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ProfileUpdateEventMsg,
  ProfileUpdateEventResponse,
  UserLoginEventMsg,
  UserLoginEventResponse,
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

  async getUser(userId: number): Promise<any> {
    try {
      const result = await this.user.findUnique({
        where: {
          userId,
        },
      });
      if (result) {
        return Object.keys(result).reduce((acc, key) => {
          if (key !== 'password') {
            acc[key] = result[key];
          }
          return acc;
        }, {});
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
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
        token: this.jwtService.sign(jwtPayload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET,
        }),
        userData: Object.keys(result).reduce((acc, key) => {
          if (key !== 'password') {
            acc[key] = result[key];
          }
          return acc;
        }, {}),
        status: 'User registered successfully',
        statusCode: 201,
      };
      return response;
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  async loginUser(payload: UserLoginEventMsg): Promise<UserLoginEventResponse> {
    try {
      const result = await this.user.findUnique({
        where: {
          userEmail: payload.email,
          password: payload.password,
        },
      });
      if (result) {
        const jwtPayload = {
          userId: result.userId,
          userEmail: result.userEmail,
          username: result.username,
        };
        const response: UserLoginEventResponse = {
          token: this.jwtService.sign(jwtPayload, {
            expiresIn: '1h',
            secret: process.env.JWT_SECRET,
          }),
          userData: Object.keys(result).reduce((acc, key) => {
            if (key !== 'password') {
              acc[key] = result[key];
            }
            return acc;
          }, {}),
          status: 'User logged in successfully',
          statusCode: 200,
        };
        return response;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  async updateProfile(
    payload: ProfileUpdateEventMsg,
  ): Promise<ProfileUpdateEventResponse> {
    try {
      const checkUser = await this.user.findUnique({
        where: {
          userId: payload.userId,
        },
      });
      if (!checkUser) {
        throw new Error('User not found');
      }
      const result = await this.user.update({
        where: {
          userId: payload.userId,
        },
        data: {
          name: payload.name,
          surname: payload.surname,
          userProfile: payload.userProfile,
          sex: payload.sex,
          password: payload.password,
          userPhone: parseInt(payload.userPhone),
          userPayment: parseInt(payload.userPayment),
          userAddress: payload.userAddress,
        },
      });
      if (result) {
        const response: ProfileUpdateEventResponse = {
          status: 'Profile updated successfully',
          statusCode: 200,
        };
        return response;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }
}
