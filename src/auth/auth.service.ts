import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  signup = async (dto: AuthDto) => {
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

      //send back token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  };

  signin = async (dto: AuthDto) => {
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

    //send back token
    return this.signToken(user.id, user.email);
  };
  signToken = async (
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> => {
    //Create payload for jwt
    const payload = {
      sub: userId,
      email,
    };
    // Get the secret password for JWT from .env file
    const secret = this.config.get('JWT_SECRET');

    //Prepare token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    // Return token
    return {
      access_token: token,
    };
  };
}
