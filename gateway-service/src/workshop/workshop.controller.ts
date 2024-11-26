import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import {
  BasicResponse,
  GetWorkshopByIdResponse,
  UpcomingResponse,
} from '@lib/src/workshop/event-msg.dto';
import { CreateWorkshopReqBody } from './dto/workshop-reqbody.dto';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}
  logger = new Logger('Gateway Workshop Controller');

  @Get('upcoming')
  async Upcoming() {
    try {
      const result: BasicResponse | UpcomingResponse =
        await this.workshopService.Upcoming();
      if (result.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      } else {
        return result;
      }
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }

  @Get()
  async GetWorkshopById(@Query('id') id: string) {
    try {
      const result: BasicResponse | GetWorkshopByIdResponse =
        await this.workshopService.GetWorkshopById(parseInt(id));
      if (result.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      }
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }

  @Post()
  async CreateWorkshop(@Body() data: CreateWorkshopReqBody) {
    try {
      const result: BasicResponse =
        await this.workshopService.CreateWorkshop(data);
      if (result.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      }
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }
}
