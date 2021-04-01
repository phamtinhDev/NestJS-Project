import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserService } from '../models/user/user.service';
import { User } from '../models/user/schemas/user.schema';
import { RegisterRequestDto } from '../models/user/dto/registerRequest.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

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

  async register(registrationData: RegisterRequestDto){
    const hashedPass = await hash(registrationData.password, 10);
  }
}
