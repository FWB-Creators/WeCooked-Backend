import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  UserSignUpEventMsg,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user/signup')
  postSignUpUser(
    payload: UserSignUpEventMsg,
  ): Promise<UserSignUpEventResponse> {
    return this.appService.signUpUser(payload);
  }
}
