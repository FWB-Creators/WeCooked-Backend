import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { ChefModel } from '../model/chef.model';
import { ChefLoginModel } from '../../../chef-service/src/model/chef.model.dto';

@Injectable()
export class ChefService {
  constructor(
    @Inject('CHEF_SERVICE') private readonly chefClient: ClientProxy,
  ) {}

  getChef(): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef', {}))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  async postSignUpChef(body: ChefModel[]): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/signup', body),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async postLoginChef(body: ChefLoginModel[]): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/login', body),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileChef(id: number): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/profile', id),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileChefs(): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/profiles', {}),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProfileChef(body: ChefModel, id: number): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/updateProfile', { body, id }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async uploadCourseVideo(id: number, payload: any): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.chefClient.send('chef/uploadCourseVideo', { id, payload }),
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}