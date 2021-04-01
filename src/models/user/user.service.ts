import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocment } from './schemas/user.schema';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocment>) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException(
        'Không tìm thấy người dùng!',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
