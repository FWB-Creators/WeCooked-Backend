import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BasicResponse, UpcomingResponse } from '@lib/src/group/event-msg.dto';

@Injectable()
export class AppService extends PrismaClient implements AppService {
  constructor() {
    super();
  }
  logger = new Logger('Group Service');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async Upcoming(): Promise<UpcomingResponse | BasicResponse> {
    try {
      const result = await this.groupID.findMany({});
      const response: UpcomingResponse = {
        status: HttpStatus.OK,
        message: 'Successfully fetched group',
        data: result,
      };
      return response;
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching group',
      };
      return response;
    }
  }
}
