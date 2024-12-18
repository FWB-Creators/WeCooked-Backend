import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '.prisma/client';
import {
  BasicResponse,
  CourseUpdateEventMsg,
  SignUpChefResponse,
  UserCourseVideoEventMsg,
} from '../../lib/src/video/event.msg.dto';

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
  async getCourseVideos(
    payload: UserCourseVideoEventMsg,
  ): Promise<SignUpChefResponse> {
    try {
      console.log(payload);
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
        data: enrollments.map((enrollment: any) => {
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

  async updateCourseDetails(
    payload: CourseUpdateEventMsg,
  ): Promise<BasicResponse> {
    try {
      const updateData = {};
      Object.keys(payload).forEach((key) => {
        if (payload[key] !== undefined && key !== 'courseId') {
          updateData[key] = payload[key];
        }
      });
      await this.course.update({
        where: {
          courseId: payload.courseId,
        },
        data: updateData,
      });
      return {
        status: HttpStatus.OK,
        message: 'Course updated successfully',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw {
            status: HttpStatus.NOT_FOUND,
            message: 'Course not found',
          };
        }
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
      };
    }
  }
}
