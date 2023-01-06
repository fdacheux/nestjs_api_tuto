import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    format: 'email',
    description: 'Must be unique or else send a 403',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @ApiProperty({
    format: 'email',
    description: 'Must be unique or else send a 403',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Must be unique or else send a 403',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
