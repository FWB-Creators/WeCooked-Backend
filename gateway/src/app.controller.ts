import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async createUser(@Body() createUserRequest: any): Observable<any> {
    return await this.appService.createUser(createUserRequest);
  }

  @Get('users')
  getUsers(): Observable<Record<string, any>[]> {
    return this.appService.getUsers();
  }
}
