import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef')
  getChef(): Promise<any> {
    const data = this.appService.getChef();
    return data;
  }
  @EventPattern('chef/signup')
  postSignUpChef(@Body() body: any): Promise<any> {
    const data = this.appService.postSignUpChef(body);
    return data;
  }
}
