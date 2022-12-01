import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //Generate password
    const hash = await argon.hash(dto.password);
    // Save the new user in db

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;
      // Return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if !user throw error
    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare passwords
    const passwordMatches = await argon.verify(user.hash, dto.password);
    //if passwords incorrect, throw err
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    //send back user
    delete user.hash;
    return user;
  }
}
