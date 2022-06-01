import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}
  @Public()
  @Post('update')
  updateUser(@Body() body: any) {
    return this.user.updateUser(body);
  }
  @Public()
  @Post(':id')
  getUser(@Param('id') id: string, @Req() req: Request) {
    return this.user.getUser(parseInt(id), req.headers.authorization);
  }
}
