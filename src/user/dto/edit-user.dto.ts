import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    format: 'email',
    description: 'Must be unique or else send a 403',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Must be unique or else send a 403',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
