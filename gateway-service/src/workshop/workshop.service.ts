import {
  BasicResponse,
  CreateWorkshopEventMsg,
  GetWorkshopByIdEventMsg,
  GetWorkshopByIdResponse,
  UpcomingResponse,
} from '@lib/src/workshop/event-msg.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateWorkshopReqBody } from './dto/workshop-reqbody.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @Inject('WORKSHOP_SERVICE') private readonly workshopclient: ClientProxy,
  ) {}
  async Upcoming() {
    try {
      const result: BasicResponse | UpcomingResponse = await lastValueFrom(
        this.workshopclient.send('workshop/upcoming', {}),
      );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while fetching workshop ${error}`,
      };
    }
  }

  async GetWorkshopById(id: number) {
    try {
      const getWorkshopByIdEventMsg: GetWorkshopByIdEventMsg = {
        id: id,
      };
      const result: BasicResponse | GetWorkshopByIdResponse =
        await lastValueFrom(
          this.workshopclient.send(
            'workshop/getWorkshopById',
            getWorkshopByIdEventMsg,
          ),
        );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while fetching workshop ${error}`,
      };
    }
  }

  async CreateWorkshop(data: CreateWorkshopReqBody) {
    try {
      const createWorkshopEventMsg: CreateWorkshopEventMsg = {
        workshopTitle: data.workshopTitle,
        workshopDetail: data.workshopDetail,
        workshopLinkZoom: data.workshopLinkZoom,
        workshopPicture: data.workshopPicture,
        workshopChefId: data.workshopChefId,
        workshopPrice: data.workshopPrice,
        workshopCategory: data.workshopCategory,
        workshopIngredientPrice: data.workshopIngredientPrice,
        workshopDate: data.workshopDate,
        workshopNumberofparticipants: data.workshopNumberofparticipants,
        workshopIngredientDetail: data.workshopIngredientDetail,
        workshopDescription: data.workshopDescription,
      };
      const result: BasicResponse = await lastValueFrom(
        this.workshopclient.send(
          'workshop/createWorkshop',
          createWorkshopEventMsg,
        ),
      );
      return result;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error while creating workshop ${error}`,
      };
    }
  }
}
