import {
  BasicResponse,
  CreateGroupEventMsg,
  GetGroupByIdEventMsg,
  GetGroupByIdResponse,
  UpcomingResponse,
} from '@lib/src/group/event-msg.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateGroupReqBody } from './dto/group-reqbody.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_SERVICE') private readonly groupclient: ClientProxy,
  ) {}
  async Upcoming() {
    try {
      const result: BasicResponse | UpcomingResponse = await lastValueFrom(
        this.groupclient.send('group/upcoming', {}),
      );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while fetching group ${error}`,
      };
    }
  }

  async GetGroupById(id: number) {
    try {
      const getGroupByIdEventMsg: GetGroupByIdEventMsg = {
        id: id,
      };
      const result: BasicResponse | GetGroupByIdResponse = await lastValueFrom(
        this.groupclient.send('group/getGroupById', getGroupByIdEventMsg),
      );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while fetching group ${error}`,
      };
    }
  }

  async CreateGroup(data: CreateGroupReqBody) {
    try {
      const createGroupEventMsg: CreateGroupEventMsg = {
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
      };
      const result: BasicResponse = await lastValueFrom(
        this.groupclient.send('group/createGroup', createGroupEventMsg),
      );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while creating group ${error}`,
      };
    }
  }
}
