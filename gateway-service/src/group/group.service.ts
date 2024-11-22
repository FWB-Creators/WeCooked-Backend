import { BasicResponse, UpcomingResponse } from '@lib/src/group/event-msg.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

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
}
