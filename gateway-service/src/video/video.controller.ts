import { Controller, Get, Logger, Query } from '@nestjs/common';
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
}
