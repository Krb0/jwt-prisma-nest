import { Injectable, ForbiddenException } from '@nestjs/common';
import { verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(id: number, authorization: string): Promise<any> {
    const token = authorization.split(' ')[1];
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new ForbiddenException('User does not exist');
    const rtMatches = await verify(user.hashedRt, token);
    if (!rtMatches) throw new ForbiddenException('Refresh token is invalid');

    return { user: { email: user.email, id: user.id } };
  }
}
