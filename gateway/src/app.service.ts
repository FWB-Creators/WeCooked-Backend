import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { ChefModel } from './model/chef.model';
import { ChefLoginModel } from '../../chef-service/src/model/chef.model.dto';

@Injectable()
export class AppService {
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

  postSignUpChef(body: ChefModel[]): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/signup', body))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

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
  }
}
