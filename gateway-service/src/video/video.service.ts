import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class VideoService {
  constructor(
    @Inject('VIDEO_SERVICE') private readonly videoClient: ClientProxy,
  ) {}
  logger = new Logger('Gateway - Video Service');

  async getVideos(): Promise<any> {
    try {
      const result = 'This action returns all videos';
      return result;
    } catch (error) {
      throw error;
    }
  }
}
