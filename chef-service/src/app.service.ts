import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '../../gateway/node_modules/.prisma/client';
// import { ChefModel } from '../../gateway/src/model/chef.model';

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
}
