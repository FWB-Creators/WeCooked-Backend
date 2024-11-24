import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient, Workshop } from '@prisma/client';
import {
  BasicResponse,
  CreateWorkshopEventMsg,
  GetWorkshopByIdResponse,
  UpcomingResponse,
} from '@lib/src/workshop/event-msg.dto';

@Injectable()
export class AppService extends PrismaClient implements AppService {
  constructor() {
    super();
  }
  logger = new Logger('Workshop Service');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async Upcoming(): Promise<UpcomingResponse | BasicResponse> {
    try {
      const result = await this.workshop.findMany({});
      const response: UpcomingResponse = {
        status: HttpStatus.OK,
        message: 'Successfully fetched workshop',
        data: result,
      };
      return response;
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching workshop',
      };
      return response;
    }
  }

  async GetWorkshopById(
    id: number,
  ): Promise<GetWorkshopByIdResponse | BasicResponse> {
    try {
      const result = await this.workshop.findUnique({
        where: {
          workshopId: id,
        },
      });
      if (result) {
        const response: GetWorkshopByIdResponse = {
          status: HttpStatus.OK,
          message: 'Successfully fetched workshop',
          data: result,
        };
        return response;
      } else {
        const response: BasicResponse = {
          status: HttpStatus.NOT_FOUND,
          message: 'Workshop not found',
        };
        return response;
      }
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while fetching workshop',
      };
      return response;
    }
  }

  async CreateWorkshop(data: CreateWorkshopEventMsg): Promise<BasicResponse> {
    try {
      // const newWorkshop: Prisma.WorkshopCreateInput = {
      //   workshopTitle: data.workshopTitle,
      //   workshopDetail: data.workshopDetail,
      //   workshopLinkZoom: data.workshopLinkZoom,
      //   workshopPicture: data.workshopPicture,
      //   workshopPrice: data.workshopPrice,
      //   workshopCategory: data.workshopCategory,
      //   workshopIngredientPrice: data.workshopIngredientPrice,
      //   workshopDate: data.workshopDate,
      //   workshopNumberofparticipants: data.workshopNumberofparticipants,
      //   chef: {
      //     connect: { chefId: data.workshopChefId },
      //   },
      //   workshopIngredientDetail: '',
      //   workshopDescription: '',
      // };
      // const result: Workshop = await this.workshop.create({
      //   data: newWorkshop,
      // });
      const result = await this.workshop.create({
        data: {
          workshopTitle: data.workshopTitle,
          workshopDetail: data.workshopDetail,
          workshopLinkZoom: data.workshopLinkZoom,
          workshopPicture: data.workshopPicture,
          workshopPrice: data.workshopPrice,
          workshopCategory: data.workshopCategory,
          workshopIngredientPrice: data.workshopIngredientPrice,
          workshopDate: data.workshopDate,
          workshopNumberofparticipants: data.workshopNumberofparticipants,
          chef: {
            connect: { chefId: data.workshopChefId },
          },
          workshopIngredientDetail: '',
          workshopDescription: '',
        },
      });

      if (!result) {
        const response: BasicResponse = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error while creating workshop',
        };
        return response;
      }
      const response: BasicResponse = {
        status: HttpStatus.CREATED,
        message: 'Successfully created workshop',
      };
      return response;
    } catch (error) {
      this.logger.error(error);
      const response: BasicResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error while creating workshop',
      };
      return response;
    }
  }
}
