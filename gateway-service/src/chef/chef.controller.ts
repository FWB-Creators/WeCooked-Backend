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
} from '@nestjs/common';
import { ChefService } from './chef.service';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import {
  ChefLoginRequestBody,
  ChefProfileUpdateRequestBody,
  ChefSignUpRequestBody,
  CourseUpdateRequestBody,
  CourseUploadRequestBody,
} from './dto/chef-reqbody.dto';

@Controller('chef')
export class ChefController {
  constructor(
    private readonly ChefService: ChefService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Gateway Service');

  @ApiTags('Chef')
  @Get('profile')
  async profileChef(@Headers('authorization') token: string): Promise<any> {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const profile = await this.ChefService.getProfileChef(
        Number(jwtPayload.chefId),
      );
      if (profile.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(profile.message);
      }
      return new Observable((observer) => {
        observer.next(profile);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Get('profiles')
  async profileChefs(@Headers('authorization') token: string): Promise<any> {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const profiles = await this.ChefService.getProfileChefs();
      if (profiles.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(profiles.message);
      }
      return new Observable((observer) => {
        observer.next(profiles);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('signup')
  async signUpChef(
    @Body() payload: ChefSignUpRequestBody,
  ): Promise<Observable<any>> {
    try {
      const signUp = await this.ChefService.postSignUpChef(payload);
      if (signUp.status === HttpStatus.CONFLICT) {
        throw new ConflictException(signUp.message);
      }
      return new Observable((observer) => {
        observer.next(signUp);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('login')
  async loginChef(
    @Body() payload: ChefLoginRequestBody,
  ): Promise<Observable<any>> {
    try {
      const login = await this.ChefService.postLoginChef(payload);
      if (login.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(login.message);
      }
      return new Observable((observer) => {
        observer.next(login);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Patch('update')
  async updateProfileChef(
    @Headers('authorization') token: string,
    @Body() payload: ChefProfileUpdateRequestBody,
  ): Promise<Observable<any>> {
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
      }
      return new Observable((observer) => {
        observer.next(updateProfile);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Post('upload')
  async uploadCourseVideo(
    @Headers('authorization') token: string,
    @Body() payload: CourseUploadRequestBody,
  ): Promise<Observable<any>> {
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
      }
      return new Observable((observer) => {
        observer.next(upload);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiTags('Chef')
  @Patch('updatecoursedetails')
  async updateCourseDetails(
    @Headers('authorization') token: string,
    @Body() payload: CourseUpdateRequestBody,
  ): Promise<Observable<any>> {
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
      }
      return new Observable((observer) => {
        observer.next(updateCourse);
        observer.complete();
      });
    } catch (error) {
      throw error;
    }
  }
}
