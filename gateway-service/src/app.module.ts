<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bb2933e3 (feat: implement http exception for sign up chef)
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
<<<<<<< HEAD:gateway-service/src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
<<<<<<< HEAD:gateway-service/src/app.module.ts
import { APP_FILTER } from '@nestjs/core';
import { ChefController } from './chef/chef.controller';
import { ChefService } from './chef/chef.service';
=======
import { ChefController } from './entity/chef.controller';
import { ChefService } from './entity/chef.service';
<<<<<<< HEAD
>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
=======
=======
>>>>>>> b7701392 (chore: change gateway to gateway-service)
import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ChefController } from './chef/chef.controller';
import { ChefService } from './chef/chef.service';
<<<<<<< HEAD
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
=======
>>>>>>> 39027d87 (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
<<<<<<< HEAD
>>>>>>> 0a1150a1 (feat: refactor app module to chef entity in gateway)
=======
=======
=======
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ChefController } from './chef/chef.controller';
import { ChefService } from './chef/chef.service';
<<<<<<< HEAD
>>>>>>> a0513b77 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
>>>>>>> bb2933e3 (feat: implement http exception for sign up chef)
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
<<<<<<< HEAD
<<<<<<< HEAD
import { UserModule } from './user/user.module';
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
=======
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b7701392 (chore: change gateway to gateway-service)
=======
>>>>>>> 54a9b80a (fix: throwing error and remove unused service)
=======
import { UserModule } from './user/user.module';
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
>>>>>>> cd415583 (chore: change gateway to gateway-service)
=======
import { UserModule } from './user/user.module';
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
=======
import { HttpExceptionFilter } from './http-exception.filter';
>>>>>>> 4a62f085 (fix: throwing error and remove unused service)
>>>>>>> 9ac66253 (fix: throwing error and remove unused service)

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
<<<<<<< HEAD
<<<<<<< HEAD
    UserModule,
=======
>>>>>>> b7701392 (chore: change gateway to gateway-service)
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
  ],
  controllers: [ChefController],
<<<<<<< HEAD:gateway-service/src/app.module.ts
<<<<<<< HEAD:gateway-service/src/app.module.ts
=======
>>>>>>> a0513b77 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
=======
    UserModule,
  ],
  controllers: [ChefController],
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
  providers: [
    ChefService,
    {
      provide: APP_FILTER,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bb2933e3 (feat: implement http exception for sign up chef)
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
=======
>>>>>>> 9ac66253 (fix: throwing error and remove unused service)
<<<<<<< HEAD:gateway-service/src/app.module.ts
      useClass: HttpExceptionFilter,
    },
  ],
<<<<<<< HEAD
<<<<<<< HEAD:gateway-service/src/app.module.ts
=======
  controllers: [ChefController],
  providers: [ChefService],
>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
=======
      useClass: HttpException,
=======
      useClass: HttpExceptionFilter,
>>>>>>> 54a9b80a (fix: throwing error and remove unused service)
    },
  ],
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
=======
      useClass: HttpException,
    },
  ],
>>>>>>> b7701392 (chore: change gateway to gateway-service)
=======
=======
  providers: [ChefService],
>>>>>>> 39027d87 (feat: refactor app module to chef entity in gateway):gateway/src/app.module.ts
<<<<<<< HEAD
>>>>>>> 0a1150a1 (feat: refactor app module to chef entity in gateway)
=======
=======
      useClass: HttpException,
=======
      useClass: HttpExceptionFilter,
>>>>>>> 4a62f085 (fix: throwing error and remove unused service)
    },
  ],
>>>>>>> a0513b77 (feat: implement http exception for sign up chef):gateway/src/app.module.ts
<<<<<<< HEAD
>>>>>>> bb2933e3 (feat: implement http exception for sign up chef)
=======
=======
      useClass: HttpException,
    },
  ],
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
>>>>>>> cd415583 (chore: change gateway to gateway-service)
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('chef');
  }
}
