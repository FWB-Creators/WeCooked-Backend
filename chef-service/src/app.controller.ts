import { Body, Controller, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef')
  @EventPattern('chef/signup')
  async postSignUpChef(@Body() body: any[]) {
    try {
      const data = await this.appService.postSignUpChef(body);
      return data;
    } catch (error) {
<<<<<<< HEAD
=======
      // return [];
      // return {
      //   status: error.status,
      //   response: error.response,
      // };
      // console.log(error.response, error.status);
      // return new HttpException(error.response, error.status);
      // throw new HttpException(error.response, error.status);
>>>>>>> 93a55995 (feat: implement http exception for sign up chef)
      return error;
    }
  }

  @EventPattern('chef/login')
  async postLoginChef(@Body() body: any[]): Promise<any> {
    try {
      const data = await this.appService.postLoginChef(body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/profile')
  async getProfileChef(@Body() id: number): Promise<any> {
    try {
      const data = await this.appService.getProfileChef(id);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/profiles')
  async getProfilesChef(): Promise<any> {
    try {
      const data = await this.appService.getProfileChefs();
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/updateProfile')
  async updateProfileChef(@Body() body: any): Promise<any> {
    try {
      const data = await this.appService.updateProfileChef(body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/uploadCourseVideo')
  async uploadCourseVideo(@Body() body): Promise<any> {
    try {
      const data = await this.appService.uploadCourseVideo(
        body.id,
        body.payload,
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}
