import { Controller, Post, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create user account' })
  @ApiCreatedResponse({ description: 'User successfully created' })
  @ApiBadRequestResponse({
    description:
      'Password must contain at least 8 chararcters, maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  @Post('signup')
  signup(@Req() req: Request) {
    console.log(req.body);
    return this.authService.signup();
  }

  @ApiOperation({ summary: 'Log user' })
  @ApiOkResponse({ description: 'Logged in' })
  @ApiUnauthorizedResponse({
    description: 'Invalid email address/password combination',
  })
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
