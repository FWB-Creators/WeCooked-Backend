import { Controller, Get, Post , Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getHelloToUserService(): Promise<string> {
    return await this.appService.getHelloToUserService();
  }

  @Post('user')
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
