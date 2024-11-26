import { Injectable, Logger, OnModuleInit, HttpStatus } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { StripeService } from './stripe/stripe.service';
import {
  BasicResponse,
  CreatePaymentForCourseEventMsg,
  CreatePaymentForCourseEventResponse,
} from '@lib/src/payment/event-msg.dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  constructor(private readonly stripeService: StripeService) {
    super();
  }
  logger = new Logger('Payment Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async getHeartbeat(): Promise<string> {
    const session = await this.stripeService.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: 'Course Name',
              metadata: {},
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://example.com/success',
    });
    return session.url;
  }

  async createCheckoutSessionForCourse(
    createPaymentForCourseEventMsg: CreatePaymentForCourseEventMsg,
  ): Promise<CreatePaymentForCourseEventResponse | BasicResponse> {
    try {
      const myorder: Prisma.OrderUncheckedCreateInput = {
        orderCourseId: createPaymentForCourseEventMsg.courseId,
        orderUserId: createPaymentForCourseEventMsg.userId,
        orderPaymentId: 0,
        orderDate: new Date(),
        orderFormat: '',
        orderPrice: 0,
      };
      const orderResult = await this.order.create({
        data: myorder,
      });
      const session = await this.stripeService.stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                name: 'Course Name',
                metadata: {
                  courseId: orderResult.orderCourseId,
                  userId: orderResult.orderUserId,
                },
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?order_id=${orderResult.orderId}`,
      });
      const result: CreatePaymentForCourseEventResponse = {
        status: HttpStatus.CREATED,
        message: 'Success',
        checkoutUrl: session.url,
      };
      return result;
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: 500,
        message: 'Internal Server Error',
      };
      return response;
    }
  }
}