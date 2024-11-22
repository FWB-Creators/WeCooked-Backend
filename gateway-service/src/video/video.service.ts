import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

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
}
