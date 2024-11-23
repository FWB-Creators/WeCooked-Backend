import { Injectable, OnModuleInit, Logger, HttpStatus } from '@nestjs/common';
import { PrismaClient, Prisma } from '../node_modules/.prisma/client';
import { ChefLoginModel } from './model/chef.model.dto';
import { JwtService } from '@nestjs/jwt';
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

  async postSignUpChef(body: any[]): Promise<any> {
    const {
      chefName,
      chefSurname,
      chefEmail,
      chefPassword,
      chefBio,
      chefExperience,
      chefSpecialty,
      chefPhone,
    }: any = body[0];
    try {
      await this.chef.create({
        data: {
          chefName,
          chefSurname,
          chefEmail,
          chefPassword,
          chefBio,
          chefExperience,
          chefSpecialty,
          chefPhone,
          chefSex: body[0].chefSex || 'male', // Add the missing chefSex property
          chefImage: 'https://via.placeholder.com/150',
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Chef registered successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for unique constraint violation
        if (e.code === 'P2002') {
          throw {
            status: HttpStatus.CONFLICT,
            message: 'Email already registered',
          };
        }
      }
      throw e;
    }
  }

  async postLoginChef(body: ChefLoginModel[]): Promise<any> {
    const { chefEmail, chefPassword }: ChefLoginModel = body[0];
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
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'Incorrect email or password',
          };
        }
      }
      throw e;
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
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'Chef not found',
            data: [],
          };
        }
      }
      throw e;
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
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'No chefs found',
            data: [],
          };
        }
      }
      throw e;
    }
  }

  async updateProfileChef(body: any): Promise<any> {
    const updateData: any = {};
    // Dynamically add fields to updateData based on keys in body.body[0]
    Object.keys(body.body[0]).forEach((key) => {
      if (body.body[0][key] !== undefined) {
        updateData[key] = body.body[0][key];
      }
    });
    try {
      await this.chef.update({
        where: {
          chefId: body.id,
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
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'Chef not found',
          };
        }
      }
      throw e;
    }
  }

  async uploadCourseVideo(chefId: number, body: any): Promise<any> {
    try {
      const { courseTitle, courseDetail, coursePrice, courseCategory } =
        body[0];
      await this.course.create({
        data: {
          courseTitle,
          courseDetail,
          coursePrice,
          courseCategory,
          courseVideoPath: body[0].courseVideoPath,
          courseIngredientPrice: body[0].courseIngredientPrice,
          courseImage: body[0].courseImage,
          chef: {
            connect: { chefId: chefId },
          },
        },
        include: {
          chef: true,
        },
      });
      return {
        status: HttpStatus.CREATED,
        message: 'Course uploaded successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw {
            status: HttpStatus.CONFLICT,
            message: 'Course already uploaded',
          };
        } else if (e.code === 'P2003') {
          throw {
            status: HttpStatus.BAD_REQUEST,
            message: 'Cannot upload course',
          };
        }
      }
      throw e;
    }
  }
}
