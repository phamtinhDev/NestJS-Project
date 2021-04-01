import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginRequestDto } from './dto/loginRequest.dto';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { UserService } from './user.service';
import { AuthService } from '../../authentication/auth.service';
import { LocalAuthGuard } from '../../authentication/guards/local.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterRequestDto, @Res() res: Response) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginRequestDto, @Res() res: Response) {}

  @Get('profile')
  profile(@Query() query, @Res() res: Response) {}
}
