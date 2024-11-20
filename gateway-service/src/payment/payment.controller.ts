import {
  Controller,
  Post,
  Body,
  Headers,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentService } from './payment.service';
import { CreatePaymentForCourseRequestBody } from './dto/payment-reqbody.dto';
import {
  CreatePaymentForCourseEventResponse,
  BasicResponse,
} from '@lib/src/payment/event-msg.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Gateway Payment Controller');

  @Post('createPaymentForCourse')
  async createPaymentForCourse(
    @Body()
    createPaymentForCourseRequestBody: CreatePaymentForCourseRequestBody,
    @Headers('authorization') token: string,
  ) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const result: CreatePaymentForCourseEventResponse | BasicResponse =
        await this.paymentService.createPaymentForCourse(
          createPaymentForCourseRequestBody,
          jwtPayload.userId,
        );
      if (result.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      } else {
        return result;
      }
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }
}
