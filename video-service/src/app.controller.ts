import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import {
  BasicResponse,
  CourseUpdateEventMsg,
  newTutorialEventMsg,
  SignUpChefResponse,
  UserCourseVideoEventMsg,
} from '../../lib/src/video/event.msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user/getCourseVideos')
  async getCourseVideos(
    payload: UserCourseVideoEventMsg,
  ): Promise<SignUpChefResponse> {
    try {
      const data = await this.appService.getCourseVideos(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/updateCourseDetails')
  async updateCourseDetails(
    payload: CourseUpdateEventMsg,
  ): Promise<BasicResponse> {
    try {
      const data = await this.appService.updateCourseDetails(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('video/newTutorial')
  async newTutorial(payload: newTutorialEventMsg): Promise<BasicResponse> {
    try {
      console.log('newTutorial', payload);
      const data = await this.appService.newTutorial(payload);
      return data;
    } catch (error) {
      return error;
    }
  }
}
