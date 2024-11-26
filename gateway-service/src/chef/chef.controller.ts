import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Patch,
  Post,
  Headers,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChefService } from './chef.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import {
  ChefLoginRequestBody,
  ChefProfileUpdateRequestBody,
  ChefSignUpRequestBody,
  CourseUpdateRequestBody,
  CourseUploadRequestBody,
} from './dto/chef-reqbody.dto';
import {
  getProfileChefResponse,
  getProfileChefsResponse,
  LoginChefResponse,
  SignUpChefResponse,
} from '@lib/src/chef/event-msg.dto';
import { BasicResponse } from '@lib/src/user/event-msg.dto';
import { BasicResponse as VideoBasicResponse } from '@lib/src/video/event.msg.dto';
@Controller('chef')
export class ChefController {
  constructor(
    private readonly ChefService: ChefService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Gateway Service');

  @ApiTags('Chef')
  @Get('profile')
  async profileChef(
    @Headers('authorization') token: string,
  ): Promise<getProfileChefResponse | BasicResponse> {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const profile = await this.ChefService.getProfileChef(
        Number(jwtPayload.chefId),
      );
      if (profile.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(profile.message);
      } else if (profile.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(profile.message);
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Get('profiles')
  async profileChefs(
    @Headers('authorization') token: string,
  ): Promise<getProfileChefsResponse | BasicResponse> {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const profiles = await this.ChefService.getProfileChefs();
      if (profiles.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(profiles.message);
      } else if (profiles.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(profiles.message);
      }
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('signup')
  async signUpChef(
    @Body() payload: ChefSignUpRequestBody,
  ): Promise<SignUpChefResponse | BasicResponse> {
    try {
      const signUp = await this.ChefService.postSignUpChef(payload);
      if (signUp.status === HttpStatus.CONFLICT) {
        throw new ConflictException(signUp.message);
      }
      if (signUp.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(signUp.message);
      }
      return signUp;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('login')
  async loginChef(
    @Body() payload: ChefLoginRequestBody,
  ): Promise<LoginChefResponse | BasicResponse> {
    try {
      const login = await this.ChefService.postLoginChef(payload);
      if (login.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(login.message);
      } else if (login.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(login.message);
      }
      return login;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Patch('update')
  async updateProfileChef(
    @Headers('authorization') token: string,
    @Body() payload: ChefProfileUpdateRequestBody,
  ): Promise<BasicResponse> {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const updateProfile = await this.ChefService.updateProfileChef(
        payload,
        Number(jwtPayload.chefId),
      );
      if (updateProfile.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(updateProfile.message);
      } else if (updateProfile.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(updateProfile.message);
      }
      return updateProfile;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('upload')
  async uploadCourseVideo(
    @Headers('authorization') token: string,
    @Body() payload: CourseUploadRequestBody,
  ): Promise<BasicResponse> {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const upload = await this.ChefService.uploadCourseVideo(
        jwtPayload.chefId,
        payload,
      );
      if (upload.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(upload.message);
      } else if (upload.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(upload.message);
      } else if (upload.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(upload.message);
      }
      return upload;
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Patch('updatecoursedetails')
  async updateCourseDetails(
    @Headers('authorization') token: string,
    @Body() payload: CourseUpdateRequestBody,
  ): Promise<VideoBasicResponse> {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const updateCourse = await this.ChefService.updateCourseDetails(
        payload,
        jwtPayload.chefId,
      );
      if (updateCourse.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(updateCourse.message);
      } else if (updateCourse.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        throw new InternalServerErrorException(updateCourse.message);
      }
      return updateCourse;
    } catch (error) {
      throw error;
    }
  }
}
