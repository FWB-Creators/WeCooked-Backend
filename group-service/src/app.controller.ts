import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BasicResponse, CreateGroupEventMsg, GetGroupByIdResponse, UpcomingResponse } from '@lib/src/group/event-msg.dto';

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

  @EventPattern('group/getGroupById')
  async GetGroupById(data: {
    id: number;
  }): Promise<BasicResponse | GetGroupByIdResponse> {
    try {
      return await this.appService.GetGroupById(data.id);
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
      return Promise.reject(response);
    }
  }

  @EventPattern('group/createGroup')
  async CreateGroup(data: CreateGroupEventMsg): Promise<BasicResponse> {
    try {
      return await this.appService.CreateGroup(data);
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
