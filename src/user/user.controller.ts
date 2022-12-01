import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

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
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  @ApiOperation({ summary: 'Get a user info' })
  @ApiOkResponse({
    description: 'The user is authorized to access this route.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', default: '0' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string', nullable: true },
        lastName: { type: 'string', nullable: true },
      },
    },
  })
  getMe(@GetUser() user: User) {
    return user;
  }
}