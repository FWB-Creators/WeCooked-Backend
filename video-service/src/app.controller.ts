import { Controller, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('getCourseVideos')
  async getCourseVideos(): Promise<{
    status: HttpStatus;
    message: string;
    data: any[];
  }> {
    try {
      const data = await this.appService.getCourseVideos();
      return data;
    } catch (error) {
      return error;
    }
  }

  @EventPattern('video/getVideos')
  getVideos(): string {
    return this.appService.getVideos();
  }
}
