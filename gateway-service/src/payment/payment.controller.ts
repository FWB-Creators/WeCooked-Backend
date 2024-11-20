import { Controller, Post, Body, Headers } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaymentService } from './payment.service';
import { CreatePaymentForCourseRequestBody } from './dto/payment-reqbody.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private jwtService: JwtService,
  ) {}

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

      return this.paymentService.createPaymentForCourse(
        createPaymentForCourseRequestBody,
        jwtPayload.userId,
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
