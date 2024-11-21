import { Controller, Get, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly VideoService: VideoService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Video Service');

  @Get()
  getVideos() {
    return this.VideoService.getVideos();
  }
}
