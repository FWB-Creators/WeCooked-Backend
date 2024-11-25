import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ChefLoginRequestBody,
  ChefProfileUpdateRequestBody,
  ChefSignUpRequestBody,
  CourseUpdateRequestBody,
  CourseUploadRequestBody,
} from './dto/chef-reqbody.dto';
import { CourseUpdateEventMsg } from '@lib/src/video/event.msg.dto';
import {
  ChefLoginEventMsg,
  ChefProfileUpdateEventMsg,
  ChefSignUpEventMsg,
  CourseUploadEventMsg,
} from '@lib/src/chef/event-msg.dto';

@Injectable()
export class ChefService {
  constructor(
    @Inject('CHEF_SERVICE') private readonly chefClient: ClientProxy,
    @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
  ) {}

  async postSignUpChef(
    chefSignUpRequestBody: ChefSignUpRequestBody,
  ): Promise<any> {
    try {
      const payload: ChefSignUpEventMsg = chefSignUpRequestBody[0];
      const result = await lastValueFrom(
        this.chefClient.send('chef/signup', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async postLoginChef(
    chefLoginRequestBody: ChefLoginRequestBody,
  ): Promise<any> {
    try {
      const payload: ChefLoginEventMsg = chefLoginRequestBody;
      const result = await lastValueFrom(
        this.chefClient.send('chef/login', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileChef(id: number): Promise<any> {
    try {
      const payload: number = id;
      const result = await lastValueFrom(
        this.chefClient.send('chef/profile', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileChefs(): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/profiles', {}),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProfileChef(
    chefUpdateProfileRequestBody: ChefProfileUpdateRequestBody,
    chefId: number,
  ): Promise<any> {
    try {
      const payload: ChefProfileUpdateEventMsg = {
        ...chefUpdateProfileRequestBody[0],
        chefId: chefId,
      };
      console.log(payload);
      const result = await lastValueFrom(
        this.chefClient.send('chef/updateProfile', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async uploadCourseVideo(
    chefId: number,
    chefUploadCourseVideoRequestBody: CourseUploadRequestBody,
  ): Promise<any> {
    try {
      const payload: CourseUploadEventMsg = {
        ...chefUploadCourseVideoRequestBody[0],
        chefId: chefId,
      };
      const result = await lastValueFrom(
        this.chefClient.send('chef/uploadCourseVideo', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCourseDetails(
    CourseUpdateDetailsRequestBody: CourseUpdateRequestBody,
    chefId: number,
  ): Promise<any> {
    try {
      const payload: CourseUpdateEventMsg = {
        ...CourseUpdateDetailsRequestBody[0],
        courseChefId: chefId,
      };
      const result = await lastValueFrom(
        this.videoClient.send('chef/updateCourseDetails', payload),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
