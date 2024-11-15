import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [process.env.NATS_URL ?? 'nats://localhost:4222'],
        // url: process.env.NATS_URL
        //   ? process.env.NATS_URL
        //   : 'nats://localhost:4222',
      },
    },
  );
  await app.listen();
  console.log('NATS microservice is listening');
}
bootstrap();
