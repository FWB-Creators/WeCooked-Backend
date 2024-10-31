import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'health-check-user-service' })
  handleSum(data: number[]): number {
    return data.reduce((a, b) => a + b, 0);
  }

  @MessagePattern({ cmd: 'UserService' })
  handleUserService(data: any): any {
    console.log('Data received from NATs:', data);

    return { message: 'Hello from User Service!' };
  }
}
