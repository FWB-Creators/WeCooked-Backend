import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD:gateway/src/entity/chef.controller.spec.ts
>>>>>>> b7701392 (chore: change gateway to gateway-service)
=======
>>>>>>> 0a1150a1 (feat: refactor app module to chef entity in gateway)
=======
=======
<<<<<<< HEAD:gateway/src/entity/chef.controller.spec.ts
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
>>>>>>> cd415583 (chore: change gateway to gateway-service)
<<<<<<<< HEAD:gateway-service/src/chef/chef.controller.spec.ts
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
========
import { AppController } from './chef.controller';
import { AppService } from './chef.service';
<<<<<<< HEAD
>>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/entity/chef.controller.spec.ts
<<<<<<< HEAD
=======
=======
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/chef/chef.controller.spec.ts
>>>>>>> b7701392 (chore: change gateway to gateway-service)
=======
>>>>>>>> 39027d87 (feat: refactor app module to chef entity in gateway):gateway/src/entity/chef.controller.spec.ts
<<<<<<< HEAD
>>>>>>> 0a1150a1 (feat: refactor app module to chef entity in gateway)
=======
<<<<<<< HEAD
=======
=======
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
>>>>>>> a0513b77 (feat: implement http exception for sign up chef):gateway/src/chef/chef.controller.spec.ts
>>>>>>> b0593c02 (chore: change gateway to gateway-service)
>>>>>>> cd415583 (chore: change gateway to gateway-service)

describe('AppController', () => {
  let appController: ChefController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChefController],
      providers: [ChefService],
    }).compile();

    appController = app.get<ChefController>(ChefController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
