import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { UserSignUpEventMsg } from '../../lib/user/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user/signup')
  postSignUpUser(payload: UserSignUpEventMsg): Promise<any> {
    return this.appService.signUpUser(payload);
  }
}
