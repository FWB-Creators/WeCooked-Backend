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
import { GroupService } from './group.service';
import {
  BasicResponse,
  GetGroupByIdResponse,
  UpcomingResponse,
} from '@lib/src/group/event-msg.dto';
import { CreateGroupReqBody } from './dto/group-reqbody.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  logger = new Logger('Gateway Group Controller');

  @Get('upcoming')
  async Upcoming() {
    try {
      const result: BasicResponse | UpcomingResponse =
        await this.groupService.Upcoming();
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
  async GetGroupById(@Query('id') id: string) {
    try {
      const result: BasicResponse | GetGroupByIdResponse =
        await this.groupService.GetGroupById(parseInt(id));
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
  async CreateGroup(@Body() data: CreateGroupReqBody) {
    try {
      const result: BasicResponse = await this.groupService.CreateGroup(data);
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
