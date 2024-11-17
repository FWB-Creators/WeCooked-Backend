import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Logger,
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
  profileChef(@Param('id') id: number): Observable<any> {
    return this.ChefService.getProfileChef(Number(id));
  }

  @ApiTags('Chef')
  @Get('chef/profiles')
  profileChefs(): Observable<any> {
    return this.ChefService.getProfileChefs();
  }

  @ApiTags('Chef')
  @Post('chef/signup')
  async signUpChef(@Body() body: any): Promise<Observable<any>> {
    try {
      const signUp = await this.ChefService.postSignUpChef(body);
      if (signUp[0].status === HttpStatus.CONFLICT) {
        throw new ConflictException(signUp[0].message);
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
  loginChef(@Body() body: any): Observable<any> {
    return this.ChefService.postLoginChef(body);
  }

  @ApiTags('Chef')
  @Patch('chef/update/:id')
  updateProfileChef(
    @Param('id') id: number,
    @Body() body: any,
  ): Observable<any> {
    return this.ChefService.updateProfileChef(body, Number(id));
  }

  @ApiTags('Chef')
  @Post('chef/upload/:id')
  uploadCourseVideo(@Param('id') id: number, @Body() payload): Observable<any> {
    return this.ChefService.uploadCourseVideo(Number(id), payload);
  }
}
