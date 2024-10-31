import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  // Define a client proxy for NATS transport
  @Client({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL ?? 'nats://localhost:4222'],
      // url: process.env.NATS_URL
      //   ? process.env.NATS_URL
      //   : 'nats://localhost:4222',
    },
  })
  private client: ClientProxy;

  async onModuleInit() {
    // Send a message with the pattern `{ cmd: 'sum' }`
    try {
      const result = await lastValueFrom(
        this.client.send({ cmd: 'health-check-user-service' }, [1, 2, 3]),
      );
      console.log('Result from Health Check User Service:', result); // Should output 6
    } catch (e) {
      console.log('Error connecting to NATS: ', e);
    }
  }

  async getHelloToUserService(): Promise<string> {
    const message = 'Hello from Gateway Service to User Service!';
    const result = await lastValueFrom(
      this.client.send({ cmd: 'UserService' }, message),
    );
    console.log('Result from microservice:', result);
    return result;
  }
}
