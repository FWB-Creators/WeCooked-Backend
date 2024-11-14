import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {
  PrismaClient,
  Prisma,
} from '../../gateway/node_modules/.prisma/client';
import { ChefLoginModel, ChefModel } from './model/chef.model.dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  logger = new Logger('Chef Service');
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }
  getChef(): Promise<any> {
    return this.chef.findMany();
  }

  async postSignUpChef(body: ChefModel[]): Promise<any> {
    const {
      chefName,
      chefSurname,
      chefEmail,
      chefPassword,
      chefBio,
      chefExperience,
      chefSpecialty,
      chefPhone,
    }: ChefModel = body[0];
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
          chefPicture: 'https://via.placeholder.com/150',
        },
      });
      return [{ message: 'Chef created successfully' }];
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for unique constraint violation
        if (e.code === 'P2002') {
          return [{ message: 'Email already registered' }];
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
        return [{ message: 'Login successful' }];
      } else {
        return [{ message: 'Login failed' }];
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for record not found
        if (e.code === 'P2025') {
          return [{ message: 'Email not registered' }];
        }
      }
      console.error('Error logging in:', e);
      throw e;
    }
  }

  async getProfileChef(id: number): Promise<any> {
    try {
      const chef = await this.chef.findUnique({
        where: {
          chefId: id,
        },
      });
      if (!chef) {
        return [];
      }
      return [
        {
          chefId: chef.chefId,
          chefName: chef.chefName,
          chefSurname: chef.chefSurname,
          chefBio: chef.chefBio,
          chefSpecialty: chef.chefSpecialty,
          chefExperience: chef.chefExperience,
          chefPicture: chef.chefPicture,
          chefEmail: chef.chefEmail,
          chefPayment: chef.chefPayment,
          chefPhone: chef.chefPhone,
        },
      ];
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for record not found
        if (e.code === 'P2025') {
          return [{ message: 'Chef not found' }];
        }
      }
      console.error('Error fetching chef:', e);
      throw e;
    }
  }
}
