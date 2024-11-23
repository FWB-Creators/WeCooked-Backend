import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '.prisma/client';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {
  logger = new Logger('Video Service');
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to the database');
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
      throw error;
    }
  }
  async getCourseVideos(payload): Promise<{
    status: HttpStatus;
    message: string;
    data: any[];
  }> {
    try {
      const enrollments = await this.enroll.findMany({
        where: {
          enrollUserId: payload.userId, // Filter by user ID
        },
        include: {
          Course: true, // Include course details
          UserId: true, // Optionally include user details
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Videos retrieved successfully',
        data: enrollments,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw {
          status: HttpStatus.NOT_FOUND,
          message: 'Videos not found',
        };
      }
      throw error;
    }
  }
}
