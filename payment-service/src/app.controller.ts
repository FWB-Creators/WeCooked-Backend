import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  BasicResponse,
  CreatePaymentForCourseEventMsg,
  CreatePaymentForCourseEventResponse,
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
  ): Promise<CreatePaymentForCourseEventResponse | BasicResponse> {
    try {
      return await this.appService.createCheckoutSessionForCourse(payload);
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
