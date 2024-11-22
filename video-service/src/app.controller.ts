import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('video/getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('video/getVideos')
  getVideos(): string {
    return this.appService.getVideos();
  }
}
