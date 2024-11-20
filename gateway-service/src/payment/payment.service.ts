import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentForCourseRequestBody } from './dto/payment-reqbody.dto';
import { CreatePaymentForCourseEventMsg } from '@lib/src/payment/event-msg.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}
  logger = new Logger('Gateway Payment Service');

  async createPaymentForCourse(
    createPaymentForCourseRequestBody: CreatePaymentForCourseRequestBody,
    userId: number,
  ) {
    const createPaymentForCourseEventMsg: CreatePaymentForCourseEventMsg = {
      courseId: createPaymentForCourseRequestBody.courseId,
      userId: userId,
    };
    console.log(createPaymentForCourseEventMsg);
    
    return lastValueFrom(
      this.paymentClient.send(
        'payment/createPaymentForCourse',
        createPaymentForCourseEventMsg,
      ),
    );
  }
}
