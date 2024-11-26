import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import {
  BasicResponse,
  ChefProfileUpdateEventMsg,
  CourseUploadEventMsg,
  getProfileChefResponse,
  getProfileChefsResponse,
  LoginChefResponse,
  SignUpChefResponse,
} from '../../lib/src/chef/event-msg.dto';
import {
  ChefLoginEventMsg,
  ChefSignUpEventMsg,
} from '../../lib/src/chef/event-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef/signup')
  async postSignUpChef(
    payload: ChefSignUpEventMsg,
  ): Promise<SignUpChefResponse | BasicResponse> {
    try {
      const data = await this.appService.postSignUpChef(payload);
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }

  @EventPattern('chef/login')
  async postLoginChef(
    payload: ChefLoginEventMsg,
  ): Promise<LoginChefResponse | BasicResponse> {
    try {
      const data = await this.appService.postLoginChef(payload);
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }

  @EventPattern('chef/profile')
  async getProfileChef(
    id: number,
  ): Promise<getProfileChefResponse | BasicResponse> {
    try {
      const data = await this.appService.getProfileChef(id);
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }

  @EventPattern('chef/profiles')
  async getProfilesChef(): Promise<getProfileChefsResponse | BasicResponse> {
    try {
      const data = await this.appService.getProfileChefs();
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }

  @EventPattern('chef/updateProfile')
  async updateProfileChef(
    payload: ChefProfileUpdateEventMsg,
  ): Promise<BasicResponse> {
    try {
      const data = await this.appService.updateProfileChef(payload);
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }

  @EventPattern('chef/uploadCourseVideo')
  async uploadCourseVideo(
    payload: CourseUploadEventMsg,
  ): Promise<BasicResponse> {
    try {
      const data = await this.appService.uploadCourseVideo(
        payload.chefId,
        payload,
      );
      return data;
    } catch (error) {
      return error as BasicResponse;
    }
  }
}
