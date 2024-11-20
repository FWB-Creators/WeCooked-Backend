import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  BasicResponse,
  CreatePaymentForCourseEventMsg,
} from '@lib/src/payment/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Payment Controller');

  @EventPattern('payment/hearbeat')
  async getHeartbeat(): Promise<string> {
    return await this.appService.getHeartbeat();
  }

  @EventPattern('payment/createPaymentForCourse')
  async createPaymentForCourse(
    payload: CreatePaymentForCourseEventMsg,
  ): Promise<string> {
    console.log(payload);
    return await this.appService.createCheckoutSessionForCourse(payload);
  }
}
