import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserService } from '../models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
    }

    delete user.password;

    return user;
  }
}
