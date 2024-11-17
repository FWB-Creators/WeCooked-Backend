import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
const logger = new Logger('Chef Microservice');
const defaultNATsHost: string =
  process.env.NATS_HOST || 'nats://localhost:4222';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [defaultNATsHost],
      },
    },
  );
  app.listen();
  app.useGlobalFilters(new HttpExceptionFilter());
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // app.useGlobalFilters(new HttpExceptionFilter());
>>>>>>> 93a55995 (feat: implement http exception for sign up chef)
=======
>>>>>>> 54a9b80a (fix: throwing error and remove unused service)
=======
=======
  // app.useGlobalFilters(new HttpExceptionFilter());
>>>>>>> a0513b77 (feat: implement http exception for sign up chef)
>>>>>>> bb2933e3 (feat: implement http exception for sign up chef)
=======
=======
  // app.useGlobalFilters(new HttpExceptionFilter());
>>>>>>> a0513b77 (feat: implement http exception for sign up chef)
=======
>>>>>>> 4a62f085 (fix: throwing error and remove unused service)
>>>>>>> 9ac66253 (fix: throwing error and remove unused service)
  logger.log('Chef - Microservice is listening');
}
bootstrap();
