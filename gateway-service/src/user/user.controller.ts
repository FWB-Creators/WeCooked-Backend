<<<<<<< HEAD
import { Controller, Post, Body, Logger, Headers, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import {
  UserSignUpRequestBody,
  UserLoginRequestBody,
  ProfileUpdateRequestBody,
} from './dto/user-reqbody.dto';
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserSignUpRequestBody } from './dto/user-reqbody.dto';
>>>>>>> cd415583 (chore: change gateway to gateway-service)

@ApiTags('User')
@Controller('user')
export class UserController {
<<<<<<< HEAD
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('Gateway Service');

  @Get()
  getUser(@Headers('authorization') token: string) {
    try {
      const jwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return this.userService.getUser(jwtPayload.userId);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
=======
  constructor(private readonly userService: UserService) {}
>>>>>>> cd415583 (chore: change gateway to gateway-service)

  @Post('signup')
  signUp(@Body() userSignUpRequestBody: UserSignUpRequestBody) {
    return this.userService.signup(userSignUpRequestBody);
  }
<<<<<<< HEAD

  @Post('login')
  login(@Body() userLoginRequestBody: UserLoginRequestBody) {
    return this.userService.login(userLoginRequestBody);
  }

  @Post('profileUpdate')
  profileUpdate(
    @Body() profileUpdateRequestBody: ProfileUpdateRequestBody,
    @Headers('authorization') token: string,
  ) {
    try {
      const jwtPayload = this.jwtService.verify(token.split(' ')[1]);
      profileUpdateRequestBody.userId = jwtPayload.userId;
      return this.userService.profileUpdate(profileUpdateRequestBody);
    } catch (error) {
      return error;
    }
  }
=======
>>>>>>> cd415583 (chore: change gateway to gateway-service)
}
