import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PaymentModule } from './payment/payment.module';
import { WorkshopModule } from './workshop/workshop.module';
import { VideoModule } from './video/video.module';
import { ChefModule } from './chef/chef.module';
import { WorkshopModule } from './workshop/workshop.module';

@Module({
  imports: [
    UserModule,
    VideoModule,
    ChefModule,
    WorkshopModule,
    PaymentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('chef/*');
  }
}
