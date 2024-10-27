import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('chef/:action?')
  handleChefAction(@Param('action') action: string): Observable<any> {
    console.log(`Action: ${action}`);
    if (!action) {
      return this.appService.getChef();
    }
    // Handle other actions if needed
  }

  @Post('chef/:action')
  handleChefPostAction(@Param('action') action: string): Observable<any> {
    console.log(`Action: ${action}`);
    if (action === 'signup') {
      return this.appService.postSignUpChef();
    }
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
