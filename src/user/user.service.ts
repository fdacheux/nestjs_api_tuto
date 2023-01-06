import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  editUser = async (userId: number, dto: EditUserDto) => {
    try {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
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
