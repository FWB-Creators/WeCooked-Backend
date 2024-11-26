import { Body, Controller, Logger, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VideoService } from './video.service';
import { PostTutorialRequestBody } from './dto/video-reqbody.dto';

@Controller('video')
export class VideoController {
  constructor(
    private readonly VideoService: VideoService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Video Service');

  @Post('newTutorial')
  async newTutorial(@Body() postTutorialRequestBody: PostTutorialRequestBody) {
    try {
      const result = await this.VideoService.newTutorial(
        postTutorialRequestBody,
      );
      return result;
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }
}
