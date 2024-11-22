import { Controller, Get, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VideoService } from './video.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('video')
export class VideoController {
  constructor(
    private readonly VideoService: VideoService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Video Service');

  @ApiTags('Video')
  @Get()
  async getCourseVideos(): Promise<any> {
    try {
      const result = await this.VideoService.getCourseVideos();
      return new Observable((observer) => {
        observer.next(result);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }
}
