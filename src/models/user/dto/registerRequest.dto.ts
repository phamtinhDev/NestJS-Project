import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}
