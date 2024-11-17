import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
<<<<<<< HEAD
import { lastValueFrom } from 'rxjs';
=======
import { lastValueFrom, Observable } from 'rxjs';
>>>>>>> b7701392 (chore: change gateway to gateway-service)
import { ChefModel } from '../model/chef.model';
import { ChefLoginModel } from '../../../chef-service/src/model/chef.model.dto';

@Injectable()
export class ChefService {
  constructor(
    @Inject('CHEF_SERVICE') private readonly chefClient: ClientProxy,
  ) {}

<<<<<<< HEAD
=======
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

>>>>>>> b7701392 (chore: change gateway to gateway-service)
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

<<<<<<< HEAD
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
=======
  postLoginChef(body: ChefLoginModel[]): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/login', body))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getProfileChef(id: number): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/profile', id))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getProfileChefs(): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/profiles', {}))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  updateProfileChef(body: ChefModel, id: number): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/updateProfile', { body, id }))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  uploadCourseVideo(id: number, payload: any): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(
        this.chefClient.send('chef/uploadCourseVideo', { id, payload }),
      )
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
>>>>>>> b7701392 (chore: change gateway to gateway-service)
  }
}
