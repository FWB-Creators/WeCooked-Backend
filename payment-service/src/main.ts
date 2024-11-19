import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('User Microservice');
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
  logger.log('Payment - Microservice is listening');
}
bootstrap();
