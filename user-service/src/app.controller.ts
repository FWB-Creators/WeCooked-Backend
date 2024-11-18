import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  UserLoginEventMsg,
  UserLoginEventResponse,
  UserSignUpEventMsg,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user/getUser')
  getUser(userId: number): Promise<any> {
    return this.appService.getUser(userId);
  }

  @EventPattern('user/signup')
  postSignUpUser(
    payload: UserSignUpEventMsg,
  ): Promise<UserSignUpEventResponse> {
    return this.appService.signUpUser(payload);
  }

  @EventPattern('user/login')
  postLoginUser(payload: UserLoginEventMsg): Promise<UserLoginEventResponse> {
    return this.appService.loginUser(payload);
  }

  @EventPattern('user/profileUpdate')
  postProfileUpdate(payload: any): Promise<any> {
    return this.appService.updateProfile(payload);
  }
}
