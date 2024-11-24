import {
  Controller,
  Post,
  Body,
  Logger,
  Headers,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import {
  UserSignUpRequestBody,
  UserLoginRequestBody,
  ProfileUpdateRequestBody,
} from './dto/user-reqbody.dto';
import {
  BasicResponse,
  UserLoginEventResponse,
  UserSignUpEventResponse,
} from '@lib/src/user/event-msg.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Gateway User Controller');

  @Get('getuser')
  getUser(@Headers('authorization') token: string) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return this.userService.getUser(jwtPayload.userId);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Post('signup')
  async signUp(@Body() userSignUpRequestBody: UserSignUpRequestBody) {
    try {
      const result: UserSignUpEventResponse | BasicResponse =
        await this.userService.signup(userSignUpRequestBody);
      if (result.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      } else {
        return result;
      }
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }

  @Post('login')
  async login(@Body() userLoginRequestBody: UserLoginRequestBody) {
    try {
      const result: UserLoginEventResponse | BasicResponse =
        await this.userService.login(userLoginRequestBody);
      if (result.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      } else {
        return result;
      }
    } catch (error) {
      this.logger.error('Internal Server Error:', error);
      throw error;
    }
  }

  @Post('profileUpdate')
  async profileUpdate(
    @Body() profileUpdateRequestBody: ProfileUpdateRequestBody,
    @Headers('authorization') token: string,
  ) {
    try {
      const jwtPayload = this.jwtService.verify(token.split(' ')[1]);
      const result = await this.userService.profileUpdate(
        profileUpdateRequestBody,
        jwtPayload.userId,
      );
      if (result.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            status: result.status,
            message: result.message,
          },
          result.status,
        );
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
  @ApiTags('Course Video')
  @Get('coursevideos')
  async getVideos(@Headers('authorization') token: string) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return this.userService.getCourseVideos(jwtPayload.userId);
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Enroll Course')
  @Post('enrollcourse')
  async enrollCourse(
    @Body() payload: any,
    @Headers('Authorization') token: string,
  ) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return await this.userService.postEnrollCourse(
        payload,
        jwtPayload.userId,
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('User')
  @Post('coursevideo')
  async getCourseVideo(
    @Headers('authorization') token: string,
    @Body() payload: any,
  ) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return this.userService.getCourseVideo(jwtPayload.userId, payload);
    } catch (error) {
      throw error;
    }
  }
}
