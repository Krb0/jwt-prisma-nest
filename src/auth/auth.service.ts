import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import argon from 'argon2';
import { AuthDto } from './dto';
import { Tokens } from './types';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  hashData(data: string) {
    return argon.hash(data);
  }
  async signupLocal({ email, password }: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(password);
    const newUser = this.prisma.user.create({
      data: {
        email,
        hash,
      },
    });
  }
  signinLocal() {}
  logout() {}
  refresh() {}
}
