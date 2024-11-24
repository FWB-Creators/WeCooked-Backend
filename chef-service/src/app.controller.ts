import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef/signup')
  async postSignUpChef(payload): Promise<any> {
    try {
      const data = await this.appService.postSignUpChef(payload[0]);
      return data;
    } catch (error) {
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
  async updateProfileChef(payload: any): Promise<any> {
    try {
      const data = await this.appService.updateProfileChef(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/uploadCourseVideo')
  async uploadCourseVideo(payload): Promise<any> {
    try {
      const data = await this.appService.uploadCourseVideo(
        payload.chefId,
        payload.payload[0],
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}
