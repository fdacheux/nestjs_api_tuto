import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create user account' })
  @ApiCreatedResponse({ description: 'User successfully created' })
  @ApiBadRequestResponse({
    description: 'email should not be empty / email must be an email',
  })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
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
