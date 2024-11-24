import { Controller, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user/getCourseVideos')
  async getCourseVideos(payload): Promise<{
    status: HttpStatus;
    message: string;
    data: any[];
  }> {
    try {
      const data = await this.appService.getCourseVideos(payload);
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('chef/updateCourseDetails')
  async updateCourseDetails(payload): Promise<{
    status: HttpStatus;
    message: string;
  }> {
    try {
      const data = await this.appService.updateCourseDetails(payload);
      return data;
    } catch (error) {
      return error;
    }
  }
}
