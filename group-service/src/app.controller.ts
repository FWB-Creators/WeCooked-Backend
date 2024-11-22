import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BasicResponse, UpcomingResponse } from '@lib/src/group/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Payment Controller');

  @EventPattern('group/upcoming')
  async Upcoming(): Promise<BasicResponse | UpcomingResponse> {
    try {
      return await this.appService.Upcoming();
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }
}
