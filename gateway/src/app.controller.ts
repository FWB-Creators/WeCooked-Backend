import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Gateway Service');

  @ApiTags('Chef')
  @Get('chef/:action?')
  handleChefAction(@Param('action') action: string): Observable<any> {
    this.logger.log('Action:', action);
    if (!action) {
      return this.appService.getChef();
    }
  }

  @ApiTags('Chef')
  @Post('chef/:action')
  handleChefPostAction(
    @Param('action') action: string,
    @Body() body: any,
  ): Observable<any> {
    this.logger.log('Action:', action);
    if (action === 'signup') {
      return this.appService.postSignUpChef(body);
    }
  }
}
