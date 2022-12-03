import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserEntity } from './entities';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'User is not authorize to access this route',
  schema: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        default: 401,
      },
      message: {
        type: 'string',
        default: 'Unauthorized',
      },
    },
  },
})
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiOperation({
    summary: 'Get a user info',
  })
  @ApiExtraModels(UserEntity)
  @ApiOkResponse({
    description: 'The user is authorized to access this route.',
    schema: {
      type: 'object',
      $ref: getSchemaPath(UserEntity),
    },
  })
  getMe(@GetUser() user: User) {
    return user;
  }
  @Patch()
  @ApiOperation({
    summary: 'Edit user info',
  })
  @ApiOkResponse({
    description:
      'The user has successfully updated his/her informations.',
    schema: {
      type: 'object',
      $ref: getSchemaPath(UserEntity),
    },
  })
  @ApiBadRequestResponse({
    description:
      'Email format invalid or one of the field is not a string',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', default: 400 },
        message: {
          type: 'array',
          example: [
            'email must be an email',
            'lastName must be a string',
          ],
        },
        error: { type: 'string', default: 'Bad request' },
      },
    },
  })
  editUser(
    @GetUser('id')
    userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
