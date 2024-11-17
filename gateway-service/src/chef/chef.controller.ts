import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChefService } from './chef.service';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class ChefController {
  constructor(private readonly ChefService: ChefService) {}
  logger = new Logger('Gateway Service');

  @ApiTags('Chef')
  @Get('chef/profile/:id?')
  async profileChef(@Param('id') id: number): Promise<any> {
    try {
      const profile = await this.ChefService.getProfileChef(Number(id));
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
  @Get('chef/profiles')
  async profileChefs(): Promise<any> {
    try {
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
  @Post('chef/signup')
  async signUpChef(@Body() body: any): Promise<Observable<any>> {
    try {
      const signUp = await this.ChefService.postSignUpChef(body);
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
  @Post('chef/login')
  async loginChef(@Body() body: any): Promise<Observable<any>> {
    try {
      const login = await this.ChefService.postLoginChef(body);
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
  @Patch('chef/update/:id')
  async updateProfileChef(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Observable<any>> {
    try {
      const updateProfile = await this.ChefService.updateProfileChef(
        body,
        Number(id),
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
  @Post('chef/upload/:id')
  async uploadCourseVideo(
    @Param('id') id: number,
    @Body() payload,
  ): Promise<Observable<any>> {
    try {
      const upload = await this.ChefService.uploadCourseVideo(id, payload);
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
}
