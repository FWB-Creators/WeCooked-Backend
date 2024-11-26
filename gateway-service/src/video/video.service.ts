import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PostTutorialRequestBody } from './dto/video-reqbody.dto';
import { newTutorialEventMsg } from '@lib/src/video/event.msg.dto';

@Injectable()
export class VideoService {
  constructor(
    @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
  ) {}
  logger = new Logger('Gateway - Video Service');

  async getCourseVideos(): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.videoClient.send('getCourseVideos', {}),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async newTutorial(body: PostTutorialRequestBody): Promise<any> {
    try {
      const eventMsg: newTutorialEventMsg = {
        title: body.title,
        details: body.details,
        tutorialVideo: body.tutorialVideo,
        tutorialImage: body.tutorialImage,
      };
      const result = await lastValueFrom(
        this.videoClient.send('video/newTutorial', eventMsg),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
