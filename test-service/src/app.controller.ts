import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

const logger = new Logger('Test Microservice');
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
    logger.log('get users!! - test service');
    return this.appService.getUsers();
  }
}
