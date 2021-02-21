import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocment } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterResponseDto } from './dto/registerResponse.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocment>) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const { email } = registerDto;

      const isEmail = await this.userModel.findOne({ email });
      if (isEmail) {
        throw new HttpException(
          'Email này đã được đăng ký!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createUser = new this.userModel(registerDto);
      await createUser.save();

      return { message: 'Đăng ký thành công!' };
    } catch (error) {
      console.log(`------- error ------- `);
      console.log(error);
      console.log(`------- error ------- `);
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException(
          'Email chưa được đăng ký!',
          HttpStatus.NOT_FOUND,
        );
      }

      const isMatch = await this.userModel.findOne({ email, password });
      if (!isMatch) {
        throw new HttpException(
          'Mật khẩu không đúng, vui lòng thử lại!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: 'Đăng nhập thành công!' };
    } catch (error) {
      console.log(`------- error ------- `);
      console.log(error);
      console.log(`------- error ------- `);
      throw error;
    }
  }

  async profile(_id: string): Promise<User> {
    try {
      const user = this.userModel.findOne({ _id });
      if (!user) {
        throw new HttpException('Không tìm thấy user!', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      console.log(`------- error ------- `);
      console.log(error);
      console.log(`------- error ------- `);
      throw error;
    }
  }
}
