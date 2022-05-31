import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AtGuard, RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/signup')
  signupLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.auth.signupLocal(body);
  }
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() body: AuthDto) {
    return this.auth.signinLocal(body);
  }
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.auth.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    return this.auth.refresh(userId, refreshToken);
  }
}
