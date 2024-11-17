import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:gateway/src/entity/chef.controller.spec.ts
<<<<<<<< HEAD:gateway-service/src/chef/chef.controller.spec.ts
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
========
import { AppController } from './chef.controller';
import { AppService } from './chef.service';
>>>>>>>> f639b2ea (feat: refactor app module to chef entity in gateway):gateway/src/entity/chef.controller.spec.ts
=======
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';
>>>>>>> 93a55995 (feat: implement http exception for sign up chef):gateway/src/chef/chef.controller.spec.ts

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
