import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  logger = new Logger('Gateway Group Controller');

  @Get('upcoming')
  async Upcoming() {
    try {
      const result = await this.groupService.Upcoming();
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
}
