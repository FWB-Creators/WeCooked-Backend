import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main Microservice');
const defaultNATsHost: string = process.env.NATS_HOST;
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    // {
    //   transport: Transport.TCP,
    //   options: {
    //     host: 'localhost',
    //     port: 3000,
    //   },
    // },
    {
      transport: Transport.NATS,
      options: {
        servers: [defaultNATsHost],
      },
    },
  );
  app.listen();
  logger.log('Microservice is listening');
}
bootstrap();
