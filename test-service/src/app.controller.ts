import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('create user!!')
  async handleCreateUser(data: any) {
    return this.appService.createUser(data);
  }

  @MessagePattern({ cmd: 'get users' })
  async getUsers() {
    console.log('get users!! - test service');
    return this.appService.getUsers();
  }
}
