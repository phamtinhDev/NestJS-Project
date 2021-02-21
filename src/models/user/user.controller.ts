import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Query,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    const newUser = await this._userService.register(body);

    return res.json(newUser);
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const loginResult = await this._userService.login(body);

    return res.json(loginResult);
  }

  @Get('profile')
  profile(@Query() query, @Res() res: Response) {
    const { id } = query;

    return res.status(HttpStatus.OK).json({
      userId: id,
      userName: 'phamtinh142',
      age: 23,
    });
  }
}
