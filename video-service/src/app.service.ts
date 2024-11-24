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
          enrollUserId: payload.userId,
        },
        include: {
          Course: {
            select: {
              courseId: true,
              courseTitle: true,
              courseDetail: true,
              coursePrice: true,
              courseImage: true,
              courseChefId: true,
              courseCategory: true,
              courseIngredientPrice: true,
            },
          },
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Videos retrieved successfully',
        data: enrollments.map((enrollment) => {
          return {
            courseId: enrollment.Course.courseId,
            courseTitle: enrollment.Course.courseTitle,
            courseDetail: enrollment.Course.courseDetail,
            coursePrice: enrollment.Course.coursePrice,
            courseImage: enrollment.Course.courseImage,
            courseChefId: enrollment.Course.courseChefId,
            courseCategory: enrollment.Course.courseCategory,
            courseIngredientPrice: enrollment.Course.courseIngredientPrice,
            isCourseCompleted: enrollment.isCourseComplete,
          };
        }),
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

  async updateCourseDetails(payload): Promise<{
    status: HttpStatus;
    message: string;
  }> {
    try {
      const updateData = {};
      Object.keys(payload.payload[0]).forEach((key) => {
        if (payload.payload[0][key] !== undefined) {
          updateData[key] = payload.payload[0][key];
        }
      });
      await this.course.update({
        where: {
          courseId: payload.payload[0].courseId,
        },
        data: updateData,
      });
      return {
        status: HttpStatus.OK,
        message: 'Course updated successfully',
      };
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'Course not found',
          };
        }
      }
      throw e;
    }
  }
}
