import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeService } from './stripe/stripe.service';
import { BasicResponse } from '@lib/src/user/event-msg.dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  constructor(private readonly stripeService: StripeService) {
    super();
  }
  logger = new Logger('Payment Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
    const test: BasicResponse = {
      message: 'Hello World',
      status: 200,
    };
    console.log(test);
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
    console.log(session);

    return session.url;
  }

  async createCheckoutSessionForCourse(
    courseId: string,
    userId: number,
  ): Promise<string> {
    const session = await this.stripeService.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: 'Course Name',
              metadata: {
                courseId: courseId,
                userId: userId,
              },
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://example.com/success',
    });
    console.log(session);

    return session.url;
  }
}
