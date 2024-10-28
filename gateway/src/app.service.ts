import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
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

  postSignUpChef(body: any): Observable<any> {
    return new Observable((observer) => {
      lastValueFrom(this.chefClient.send('chef/signup', body))
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
