import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
