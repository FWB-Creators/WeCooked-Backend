import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserSignUpRequestBody } from './dto/user-reqbody.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  logger = new Logger('Gateway Service');

  @Post('signup')
  signUp(@Body() userSignUpRequestBody: UserSignUpRequestBody) {
    return this.userService.signup(userSignUpRequestBody);
  }
}
