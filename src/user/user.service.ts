import { Injectable, ForbiddenException } from '@nestjs/common';
import { verify, hash } from 'argon2';
import { UpdateUserDto } from 'src/auth/dto';
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

    return {
      user: {
        email: user.email,
        id: user.id,
        username: user?.username,
        photo: user?.photo,
      },
    };
  }
  async updateUser(user: UpdateUserDto) {
    console.log(user);
    const { id, password, ...newUser } = user;
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userToUpdate) throw new ForbiddenException('User does not exist');
    const passwordMatches = await verify(userToUpdate.hash, password);
    if (!passwordMatches) throw new ForbiddenException('Password is invalid');
    const hashPass = await hash(password);
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...newUser,
        hash: hashPass,
      },
    });
  }
}
