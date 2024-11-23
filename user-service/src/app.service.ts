import { Injectable, Logger, OnModuleInit, HttpStatus } from '@nestjs/common';
import {
  BasicResponse,
  GetUserEventResponse,
  ProfileUpdateEventMsg,
  ProfileUpdateEventResponse,
  UserLoginEventMsg,
  UserLoginEventResponse,
  UserSignUpEventMsg,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

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

  async getUser(userId: number): Promise<GetUserEventResponse | BasicResponse> {
    try {
      const result = await this.user.findUnique({
        where: {
          userId,
        },
      });
      if (result) {
        return {
          status: HttpStatus.OK,
          message: 'User found',
          data: Object.keys(result).reduce((acc, key) => {
            if (key !== 'password') {
              acc[key] = result[key];
            }
            return acc;
          }, {}),
        };
      } else {
        this.logger.error('User not found');
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
        return response;
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to connect to the database',
      };
      return response;
    }
  }

  async signUpUser(
    payload: UserSignUpEventMsg,
  ): Promise<UserSignUpEventResponse | BasicResponse> {
    try {
      const result = await this.user.create({
        data: {
          userEmail: payload.email,
          password: payload.password,
          name: payload.firstName,
          surname: payload.lastName,
          userProfile: 'https://via.placeholder.com/150',
        },
      });
      const jwtPayload = {
        userId: result.userId,
        userEmail: result.userEmail,
        // username: result.username,
      };
      const response: UserSignUpEventResponse = {
        token: this.jwtService.sign(jwtPayload, {
          expiresIn: '1w',
          secret: process.env.JWT_SECRET,
        }),
        userData: Object.keys(result).reduce((acc, key) => {
          if (key !== 'password') {
            acc[key] = result[key];
          }
          return acc;
        }, {}),
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
      };
      return response;
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      if ((error as any)?.code === 'P2002') {
        console.log(error);

        const response: BasicResponse = {
          status: HttpStatus.CONFLICT,
          message: 'DB Constraint Failed',
        };
        return response;
      } else {
        const response: BasicResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to connect to the database',
        };
        return response;
      }
    }
  }

  async loginUser(
    payload: UserLoginEventMsg,
  ): Promise<UserLoginEventResponse | BasicResponse> {
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
          status: HttpStatus.OK,
          message: 'User logged in successfully',
        };

        return response;
      } else {
        this.logger.error('User not found');
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
        return response;
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to connect to the database',
      };
      return response;
    }
  }

  async updateProfile(
    payload: ProfileUpdateEventMsg,
  ): Promise<ProfileUpdateEventResponse | BasicResponse> {
    try {
      const videos = await this.user.findUnique({
        where: {
          userId: payload.userId,
        },
      });
      if (!videos) {
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
        return response;
      }
      const result = await this.user.update({
        where: {
          userId: payload.userId,
        },
        data: {
          name: payload.name,
          surname: payload.surname,
          userProfile: payload.userProfile,
          Sex: payload.sex,
          password: payload.password,
          userPhone: payload.userPhone,
          userAddress: payload.userAddress,
        },
      });
      if (result) {
        const response: ProfileUpdateEventResponse = {
          status: HttpStatus.OK,
          message: 'Profile updated successfully',
        };
        return response;
      } else {
        this.logger.error('Failed to update profile');
        const response: BasicResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update profile',
        };
        return response;
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to connect to the database',
      };
      return response;
    }
  }

  async enrollCourse(payload: any): Promise<any> {
    try {
      const result = await this.user.findUnique({
        where: {
          userId: payload.userId,
        },
      });
      if (!result) {
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
        return response;
      }
      console.log(payload);
      const course = await this.course.findUnique({
        where: {
          courseId: Number(payload.course.courseId),
        },
      });
      if (!course) {
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'Course not found',
        };
        return response;
      }
      const enroll = await this.enroll.create({
        data: {
          enrollUserId: payload.userId,
          enrollCourseId: course.courseId,
        },
      });
      // const enroll = false;
      if (enroll) {
        const response: BasicResponse = {
          status: HttpStatus.CREATED,
          message: 'Course enrolled successfully',
        };
        return response;
      } else {
        this.logger.error('Failed to enroll course');
        const response: BasicResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to enroll course',
        };
        return response;
      }
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to connect to the database',
      };
      return response;
    }
  }
}
