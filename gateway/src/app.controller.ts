import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Gateway Service');

  @ApiTags('Chef')
  @Get('chef/profile/:id?')
  handleChefAction(@Param('id') id: number): Observable<any> {
    return this.appService.getProfileChef(Number(id));
  }

  @ApiTags('Chef')
  @Post('chef/signup')
  signUpChef(@Body() body: any): Observable<any> {
    return this.appService.postSignUpChef(body);
  }

  @ApiTags('Chef')
  @Post('chef/login')
  loginChef(@Body() body: any): Observable<any> {
    return this.appService.postLoginChef(body);
  }
}
