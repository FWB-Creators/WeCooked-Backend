import { Test, TestingModule } from '@nestjs/testing';
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';

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
