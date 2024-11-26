import { Injectable, Logger, OnModuleInit, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StripeService } from './stripe/stripe.service';
import {
  BasicResponse,
  CreatePaymentForCourseEventMsg,
  CreatePaymentForCourseEventResponse,
  CreatePaymentForWorkshopEventMsg,
  PaymentSuccessEventMsg,
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

  async createCheckoutSessionForCourse(
    createPaymentForCourseEventMsg: CreatePaymentForCourseEventMsg,
  ): Promise<CreatePaymentForCourseEventResponse | BasicResponse> {
    try {
      const course = await this.course.findUnique({
        where: {
          courseId: createPaymentForCourseEventMsg.courseId,
        },
      });

      const user = await this.user.findUnique({
        where: {
          userId: createPaymentForCourseEventMsg.userId,
        },
      });
      const orderResult = await this.order.create({
        data: {
          userId: {
            connect: {
              userId: user.userId,
            },
          },
          orderFormat: JSON.stringify({
            type: 'course',
            courseId: course.courseId,
          }),
          orderDate: new Date(),
          orderStatus: 'pending',
          orderPrice: createPaymentForCourseEventMsg.isWithIngredient
            ? course.coursePrice + course.courseIngredientPrice
            : course.coursePrice,
          orderWithIngredient: createPaymentForCourseEventMsg.isWithIngredient,
          orderDeliveryAddress: user.userAddress,
        },
      });
      const session = await this.stripeService.stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                name: createPaymentForCourseEventMsg.isWithIngredient
                  ? `${course.courseTitle} with ingredient`
                  : course.courseTitle,
                metadata: {
                  orderId: orderResult.orderId,
                  courseId: course.courseId,
                  userId: user.userId,
                },
              },
              unit_amount: orderResult.orderPrice * 100,
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

  async createCheckoutSessionForWorkshop(
    createPaymentForWorkshopEventMsg: CreatePaymentForWorkshopEventMsg,
  ): Promise<CreatePaymentForCourseEventResponse | BasicResponse> {
    try {
      const workshop = await this.workshop.findUnique({
        where: {
          workshopId: createPaymentForWorkshopEventMsg.workshopId,
        },
      });

      const user = await this.user.findUnique({
        where: {
          userId: createPaymentForWorkshopEventMsg.userId,
        },
      });

      const orderResult = await this.order.create({
        data: {
          userId: {
            connect: {
              userId: user.userId,
            },
          },
          orderFormat: JSON.stringify({
            type: 'workshop',
            workshopId: workshop.workshopId,
          }),
          orderDate: new Date(),
          orderStatus: 'pending',
          orderPrice: createPaymentForWorkshopEventMsg.isWithIngredient
            ? workshop.workshopPrice + workshop.workshopIngredientPrice
            : workshop.workshopPrice,
          orderWithIngredient:
            createPaymentForWorkshopEventMsg.isWithIngredient,
          orderDeliveryAddress: user.userAddress,
        },
      });
      const session = await this.stripeService.stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                name: workshop.workshopTitle,
                metadata: {
                  orderId: orderResult.orderId,
                  workshopId: workshop.workshopId,
                  userId: orderResult.orderUserId,
                },
              },
              unit_amount: orderResult.orderPrice * 100,
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

  async paymentSuccess(
    paymentSuccessEventMsg: PaymentSuccessEventMsg,
  ): Promise<BasicResponse> {
    try {
      const order = await this.order.findUnique({
        where: {
          orderId: paymentSuccessEventMsg.orderId,
        },
      });
      if (!order) {
        const response: BasicResponse = {
          status: 404,
          message: 'Order not found',
        };
        return response;
      }
      await this.order.update({
        where: {
          orderId: order.orderId,
        },
        data: {
          orderStatus: 'completed',
        },
      });
      const response: BasicResponse = {
        status: 200,
        message: 'Payment success',
      };
      return response;
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
