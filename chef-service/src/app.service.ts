import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getChef(): any {
    return 'Chef is here';
  }
}
