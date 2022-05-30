import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('local/signup')
  signupLocal(@Body() body: AuthDto): Promise<Tokens> {
    return this.auth.signupLocal(body);
  }
  @Post('local/signin')
  signinLocal() {
    return this.auth.signinLocal();
  }
  @Post('logout')
  logout() {
    return this.auth.logout();
  }
  @Post('refresh')
  refresh() {
    return this.auth.refresh();
  }
}
