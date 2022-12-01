import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create user account' })
  @ApiCreatedResponse({
    description: 'User successfully created',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY2OTg4OTE4MiwiZXhwIjoxNjY5ODkwMDgyfQ.j0jK-K7NdomHZg4FLHSXu5t2CUgHZ0Cet5IAtDLq2fs',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email field empty or invalid input',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', default: 400 },
        message: {
          type: 'array',
          default: ['email should not be empty', 'email must be an email'],
        },
        error: { type: 'string', default: 'Bad request' },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Credentials already taken',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', default: 403 },
        message: {
          type: 'string',
          default: 'Credentials taken',
        },
        error: { type: 'string', default: 'Forbidden' },
      },
    },
  })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Log user' })
  @ApiOkResponse({
    description: 'Logged in',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY2OTg4OTE4MiwiZXhwIjoxNjY5ODkwMDgyfQ.j0jK-K7NdomHZg4FLHSXu5t2CUgHZ0Cet5IAtDLq2fs',
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: "User's email or password is incorrect",
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', default: 403 },
        message: {
          type: 'string',
          default: 'Credentials incorrect',
        },
        error: { type: 'string', default: 'Forbidden' },
      },
    },
  })
  @Post('signin')
  @HttpCode(200)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
