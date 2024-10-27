import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef')
  getChef(): string {
    const data = this.appService.getChef();
    return data;
  }
  @EventPattern('chef/signup')
  postSignUpChef(): string {
    const data = this.appService.postSignUpChef();
    return data;
  }
}
