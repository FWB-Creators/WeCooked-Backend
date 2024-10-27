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

  @Get('chef')
  getChef(): Observable<any> {
    console.log('get chef');
    return this.appService.getChef();
    // return 'Chef is here!';
  }

  // @Post()
  // createUser(@Body() createUserRequest: any): Observable<any> {
  //   return this.appService.createUser(createUserRequest);
  // }

  // @Get('users')
  // getUsers(): Observable<Record<string, any>[]> {
  //   return this.appService.getUsers();
  // }
}
