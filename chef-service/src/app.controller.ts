import { Body, Controller, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('chef')
  getChef(): Promise<any> {
    const data = this.appService.getChef();
    return data;
  }
  @EventPattern('chef/signup')
  async postSignUpChef(@Body() body: any[]) {
    try {
      const data = await this.appService.postSignUpChef(body);
      return data;
    } catch (error) {
      // return [];
      // return {
      //   status: error.status,
      //   response: error.response,
      // };
      // console.log(error.response, error.status);
      // return new HttpException(error.response, error.status);
      // throw new HttpException(error.response, error.status);
      return error;
    }
  }

  @EventPattern('chef/login')
  postLoginChef(@Body() body: any[]): Promise<any> {
    const data = this.appService.postLoginChef(body);
    return data;
  }

  @EventPattern('chef/profile')
  getProfileChef(@Body() id: number): Promise<any> {
    const data = this.appService.getProfileChef(id);
    return data;
  }

  @EventPattern('chef/profiles')
  getProfilesChef(): Promise<any> {
    const data = this.appService.getProfileChefs();
    return data;
  }

  @EventPattern('chef/updateProfile')
  updateProfileChef(@Body() body: any): Promise<any> {
    const data = this.appService.updateProfileChef(body);
    return data;
  }

  @EventPattern('chef/uploadCourseVideo')
  uploadCourseVideo(@Body() body): Promise<any> {
    console.log('uploadCourseVideo');
    console.log(body);
    const data = this.appService.uploadCourseVideo(body.id, body.payload);
    return data;
  }
}
