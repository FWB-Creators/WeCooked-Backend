import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GroupID, PrismaClient } from '@prisma/client';
import {
  BasicResponse,
  CreateGroupEventMsg,
  GetGroupByIdResponse,
  UpcomingResponse,
} from '@lib/src/group/event-msg.dto';

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

  async GetGroupById(
    id: number,
  ): Promise<GetGroupByIdResponse | BasicResponse> {
    try {
      const result = await this.groupID.findUnique({
        where: {
          groupId: id,
        },
      });
      if (result) {
        const response: GetGroupByIdResponse = {
          status: HttpStatus.OK,
          message: 'Successfully fetched group',
          data: result,
        };
        return response;
      } else {
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'Group not found',
        };
        return response;
      }
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching group',
      };
      return response;
    }
  }

  async CreateGroup(data: CreateGroupEventMsg): Promise<BasicResponse> {
    try {
      const result: GroupID = await this.groupID.create({
        data: {
          groupTitle: data.groupTitle,
          groupDetail: data.groupDetail,
          groupLinkZoom: data.groupLinkZoom,
          groupPicture: data.groupPicture,
          groupChefId: data.groupChefId,
          groupPrice: data.groupPrice,
          groupCategory: data.groupCategory,
          groupIngredientPrice: data.groupIngredientPrice,
          groupDate: data.groupDate,
          groupNumberOfParticipants: data.groupNumberOfParticipants,
        },
      });
      if (!result) {
        const response: BasicResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error while creating group',
        };
        return response;
      }
      const response: BasicResponse = {
        status: HttpStatus.CREATED,
        message: 'Successfully created group',
      };
      return response;
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while creating group',
      };
      return response;
    }
  }
}
