import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString({ message: 'Name is not valid' })
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password is not valid' })
  password: string;
}
