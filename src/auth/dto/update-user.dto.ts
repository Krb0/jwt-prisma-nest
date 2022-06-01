import { IsEmail, IsNumber, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsNumber()
  id: number;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  @IsString()
  photo?: string;
  @IsString()
  username?: string;
}
