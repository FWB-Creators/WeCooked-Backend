import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ProfileUpdateRequestBody,
  UserLoginRequestBody,
  UserSignUpRequestBody,
} from './dto/user-reqbody.dto';
import {
  UserSignUpEventMsg,
  UserLoginEventMsg,
  ProfileUpdateEventMsg,
  UserSignUpEventResponse,
  BasicResponse,
  UserLoginEventResponse,
  ProfileUpdateEventResponse,
} from '@lib/src/user/event-msg.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
  ) {}
  logger = new Logger('Gateway User Service');

  async getUser(userId: number): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.userClient.send('user/getUser', userId),
      );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }

  async signup(
    userSignUpRequestBody: UserSignUpRequestBody,
  ): Promise<UserSignUpEventResponse | BasicResponse> {
    try {
      const userSignUpEventMsg: UserSignUpEventMsg = {
        email: userSignUpRequestBody.email,
        password: userSignUpRequestBody.password,
        firstName: userSignUpRequestBody.firstName,
        lastName: userSignUpRequestBody.lastName,
      };

      const result: UserSignUpEventResponse | BasicResponse =
        await lastValueFrom(
          this.userClient.send('user/signup', userSignUpEventMsg),
        );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }

  async login(
    userLoginRequestBody: UserLoginRequestBody,
  ): Promise<UserLoginEventResponse | BasicResponse> {
    try {
      const userLoginEventMsg: UserLoginEventMsg = {
        email: userLoginRequestBody.email,
        password: userLoginRequestBody.password,
      };
      const result: UserLoginEventResponse | BasicResponse =
        await lastValueFrom(
          this.userClient.send('user/login', userLoginEventMsg),
        );

      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }

  async profileUpdate(
    profileUpdateRequestBody: ProfileUpdateRequestBody,
    userId: number,
  ): Promise<ProfileUpdateEventResponse | BasicResponse> {
    try {
      const userUpdateEventMsg: ProfileUpdateEventMsg = {
        userId: userId,
        name: profileUpdateRequestBody.name,
        surname: profileUpdateRequestBody.surname,
        userProfile: profileUpdateRequestBody.userProfile,
        sex: profileUpdateRequestBody.sex,
        password: profileUpdateRequestBody.password,
        userPhone: profileUpdateRequestBody.userPhone,
        userPayment: profileUpdateRequestBody.userPayment,
        userAddress: profileUpdateRequestBody.userAddress,
      };
      const result: ProfileUpdateEventResponse | BasicResponse =
        await lastValueFrom(
          this.userClient.send('user/profileUpdate', userUpdateEventMsg),
        );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }

  async getCourseVideos(userId: number): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.videoClient.send('user/getCourseVideos', { userId }),
      );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }

  async postEnrollCourse(
    enrollCourseRequestBody: any[],
    userId: number,
  ): Promise<any> {
    try {
      const enrollCourseEventMsg = {
        course: enrollCourseRequestBody[0],
        userId: userId,
      };
      const result = await lastValueFrom(
        this.userClient.send('user/enrollCourse', enrollCourseEventMsg),
      );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }
}
