import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  editUser = async (userId: number, dto: EditUserDto) => {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  };

  deleteUser = async (userId: number) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new ForbiddenException('Access to resources denied !');

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  };
}
