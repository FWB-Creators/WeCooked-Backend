import { Injectable, OnModuleInit, Logger, HttpStatus } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ChefProfileUpdateEventMsg } from '../../lib/src/chef/event-msg.dto';
import {
  ChefLoginEventMsg,
  ChefSignUpEventMsg,
  CourseUploadEventMsg,
} from '@lib/src/chef/event-msg.dto';
@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  constructor(private jwtService: JwtService) {
    super();
  }
  logger = new Logger('Chef Service');
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to the database');
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  async postSignUpChef(payload: ChefSignUpEventMsg): Promise<any> {
    try {
      const chef = await this.chef.create({
        data: {
          chefName: payload.chefName,
          chefSurname: payload.chefSurname,
          chefEmail: payload.chefEmail,
          chefPassword: payload.chefPassword,
          chefBio: payload.chefBio,
          chefExperience: payload.chefExperience,
          chefSpecialty: payload.chefSpecialty,
          chefPhone: payload.chefPhone,
          chefSex: payload.chefSex,
          chefImage: payload.chefImage,
        },
      });
      const jwtPayload = {
        chefId: chef.chefId,
        chefEmail: chef.chefEmail,
      };
      return {
        token: this.jwtService.sign(jwtPayload, {
          expiresIn: '1w',
          secret: process.env.JWT_SECRET,
        }),
        status: HttpStatus.CREATED,
        message: 'Chef registered successfully',
      };
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for unique constraint violation
        if (e.code === 'P2002') {
          return {
            status: HttpStatus.CONFLICT,
            message: 'Email already registered',
          };
        }
      }
      return e;
    }
  }

  async postLoginChef(payload: ChefLoginEventMsg): Promise<any> {
    const { chefEmail, chefPassword } = payload[0];
    try {
      const chef = await this.chef.findUnique({
        where: {
          chefEmail,
        },
      });
      if (chef && chef.chefPassword === chefPassword) {
        const jwtPayload = {
          chefId: chef.chefId,
          chefEmail: chef.chefEmail,
        };
        return {
          token: this.jwtService.sign(jwtPayload, {
            expiresIn: '1w',
            secret: process.env.JWT_SECRET,
          }),
          status: HttpStatus.OK,
          message: 'Login successful',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Incorrect email or password',
        };
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for record not found
        if (e.code === 'P2025') {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Incorrect email or password',
          };
        }
      }
      return e;
    }
  }

  async getProfileChef(id: number): Promise<any> {
    try {
      const chef = await this.chef.findUnique({
        where: {
          chefId: id,
        },
        select: {
          chefId: true,
          chefName: true,
          chefSurname: true,
          chefEmail: true,
          chefBio: true,
          chefExperience: true,
          chefSpecialty: true,
          chefPhone: true,
          chefImage: true,
        },
      });
      if (!chef) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Chef not found',
          data: [],
        };
      } else {
        return {
          status: HttpStatus.OK,
          message: 'Chef found',
          data: chef,
        };
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for record not found
        console.log(e);
        if (e.code === 'P2025') {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Chef not found',
            data: [],
          };
        }
      }
      return e;
    }
  }

  async getProfileChefs(): Promise<any> {
    try {
      const chef = await this.chef.findMany();
      if (chef.length === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'No chefs found',
          data: [],
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Chefs found',
        data: chef,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for record not found
        if (e.code === 'P2025') {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'No chefs found',
            data: [],
          };
        }
      }
      return e;
    }
  }

  async updateProfileChef(payload: ChefProfileUpdateEventMsg): Promise<any> {
    const updateData: ChefProfileUpdateEventMsg = {};
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined) {
        updateData[key] = payload[key];
      }
    });
    try {
      await this.chef.update({
        where: {
          chefId: payload.chefId,
        },
        data: updateData,
      });
      return {
        status: HttpStatus.OK,
        message: 'Chef updated successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Chef not found',
          };
        }
      }
      return e;
    }
  }

  async uploadCourseVideo(
    chefId: number,
    payload: CourseUploadEventMsg,
  ): Promise<any> {
    try {
      await this.course.create({
        data: {
          courseTitle: payload.courseTitle,
          courseDetail: payload.courseDetail,
          coursePrice: payload.coursePrice,
          courseCategory: payload.courseCategory,
          courseVideoPath: payload.courseVideoPath,
          courseIngredientPrice: payload.courseIngredientPrice,
          courseImage: payload.courseImage,
          courseChefId: chefId,
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Course uploaded successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return {
            status: HttpStatus.CONFLICT,
            message: 'Course already uploaded',
          };
        } else if (e.code === 'P2003') {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Cannot upload course',
          };
        }
      }
      return e;
    }
  }
}
