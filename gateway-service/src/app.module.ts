<<<<<<< HEAD:gateway-service/src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
<<<<<<< HEAD:gateway-service/src/app.module.ts
import { APP_FILTER } from '@nestjs/core';
import { ChefController } from './chef/chef.controller';
import { ChefService } from './chef/chef.service';
=======
import { ChefController } from './entity/chef.controller';
import { ChefService } from './entity/chef.service';
>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
=======
import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ChefController } from './chef/chef.controller';
import { ChefService } from './chef/chef.service';
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'CHEF_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
    UserModule,
  ],
  controllers: [ChefController],
  providers: [
    ChefService,
    {
      provide: APP_FILTER,
<<<<<<< HEAD:gateway-service/src/app.module.ts
      useClass: HttpExceptionFilter,
    },
  ],
<<<<<<< HEAD:gateway-service/src/app.module.ts
=======
  controllers: [ChefController],
  providers: [ChefService],
>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
=======
      useClass: HttpException,
    },
  ],
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('chef');
  }
}
