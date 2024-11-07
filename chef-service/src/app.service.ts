import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '../../gateway/node_modules/.prisma/client';
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
    console.log(body);
    try {
      await this.chef.create({
        data: {
          chefName,
          chefSurname,
          chefEmail,
          chefUsername: chefEmail,
          chefPassword,
          chefBio,
          chefExperience,
          chefSpecialty,
          chefPhone,
          chefPicture: 'https://via.placeholder.com/150',
        },
      });
      return { message: 'Chef created successfully' };
    } catch (e) {
      console.error('Error creating chef:', e);
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
        return { message: 'Login successful' };
      } else {
        return { message: 'Login failed' };
      }
    } catch (e) {
      console.error('Error logging in:', e);
      throw e;
    }
  }
}
