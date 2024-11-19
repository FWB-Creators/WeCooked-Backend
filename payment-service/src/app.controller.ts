import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Payment Controller');

  @EventPattern('payment/hearbeat')
  async getHeartbeat(): Promise<string> {
    return await this.appService.getHeartbeat();
  }
}
