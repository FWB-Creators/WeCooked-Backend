import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('chef')
  getChef(): string {
    console.log('get chef, microservice');
    const data = this.appService.getChef();
    return data;
  }
}
