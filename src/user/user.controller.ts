import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'User is not authorize to access this route',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 401 },
      message: { type: 'string', default: 'Unauthorized' },
    },
  },
})
@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request): string {
    console.log({
      user: req.user,
    });
    return 'User info';
  }
}
