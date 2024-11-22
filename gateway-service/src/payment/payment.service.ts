import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentForCourseRequestBody } from './dto/payment-reqbody.dto';
import {
  CreatePaymentForCourseEventMsg,
  CreatePaymentForCourseEventResponse,
} from '@lib/src/payment/event-msg.dto';
import { BasicResponse } from '@lib/src/payment/event-msg.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}
  logger = new Logger('Gateway Payment Service');

  async createPaymentForCourse(
    createPaymentForCourseRequestBody: CreatePaymentForCourseRequestBody,
    userId: number,
  ): Promise<CreatePaymentForCourseEventResponse | BasicResponse> {
    try {
      const createPaymentForCourseEventMsg: CreatePaymentForCourseEventMsg = {
        courseId: createPaymentForCourseRequestBody.courseId,
        userId: userId,
      };

      const result: CreatePaymentForCourseEventResponse | BasicResponse =
        await lastValueFrom(
          this.paymentClient.send(
            'payment/createPaymentForCourse',
            createPaymentForCourseEventMsg,
          ),
        );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error at Gateway Service',
      };
      return response;
    }
  }
}