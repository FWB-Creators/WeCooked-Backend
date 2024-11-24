import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  BasicResponse,
  ProfileUpdateEventMsg,
  ProfileUpdateEventResponse,
  UserLoginEventMsg,
  UserLoginEventResponse,
  UserSignUpEventMsg,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('User Controller');

  @EventPattern('user/getUser')
  getUser(userId: number): Promise<any> {
    try {
      return this.appService.getUser(userId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @EventPattern('user/signup')
  postSignUpUser(
    payload: UserSignUpEventMsg,
  ): Promise<UserSignUpEventResponse | BasicResponse> {
    try {
      return this.appService.signUpUser(payload);
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('user/login')
  postLoginUser(
    payload: UserLoginEventMsg,
  ): Promise<UserLoginEventResponse | BasicResponse> {
    try {
      console.log('login');
      return this.appService.loginUser(payload);
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('user/profileUpdate')
  postProfileUpdate(
    payload: ProfileUpdateEventMsg,
  ): Promise<ProfileUpdateEventResponse | BasicResponse> {
    try {
      return this.appService.updateProfile(payload);
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('user/enrollCourse')
  async postEnrollCourse(payload: any): Promise<any> {
    try {
      return this.appService.enrollCourse(payload);
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('user/getCourseVideo')
  async getCourseVideo(payload: any): Promise<any> {
    try {
      return this.appService.getCourseVideo(payload.userId, payload.payload[0]);
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }
}
