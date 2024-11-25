import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import {
  ChefProfileUpdateEventMsg,
  CourseUploadEventMsg,
} from '../../lib/src/chef/event-msg.dto';
import {
  ChefLoginEventMsg,
  ChefSignUpEventMsg,
} from '../../lib/src/chef/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef/signup')
  async postSignUpChef(payload: ChefSignUpEventMsg): Promise<any> {
    try {
      const data = await this.appService.postSignUpChef(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/login')
  async postLoginChef(payload: ChefLoginEventMsg): Promise<any> {
    try {
      const data = await this.appService.postLoginChef(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/profile')
  async getProfileChef(id: number): Promise<any> {
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
  async updateProfileChef(payload: ChefProfileUpdateEventMsg): Promise<any> {
    try {
      const data = await this.appService.updateProfileChef(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/uploadCourseVideo')
  async uploadCourseVideo(payload: CourseUploadEventMsg): Promise<any> {
    try {
      const data = await this.appService.uploadCourseVideo(
        payload.chefId,
        payload,
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}
