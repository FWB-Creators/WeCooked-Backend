import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  BasicResponse,
  CreateWorkshopEventMsg,
  GetWorkshopByIdResponse,
  UpcomingResponse,
} from '@lib/src/workshop/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  logger = new Logger('Workshop Controller');

  @EventPattern('workshop/upcoming')
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

  @EventPattern('workshop/getWorkshopById')
  async GetWorkshopById(data: {
    id: number;
  }): Promise<BasicResponse | GetWorkshopByIdResponse> {
    try {
      return await this.appService.GetWorkshopById(data.id);
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('workshop/createWorkshop')
  async CreateWorkshop(data: CreateWorkshopEventMsg): Promise<BasicResponse> {
    try {
      return await this.appService.CreateWorkshop(data);
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
