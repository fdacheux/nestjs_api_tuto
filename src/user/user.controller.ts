import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserApi } from './api/user.api';
import { EditUserDto } from './dto/edit-user.dto';
import { UserEntity } from './entities/tuser.entity';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse(UserApi.global.unauthorizedResponse)
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiOperation(UserApi.getMe.operation)
  @ApiExtraModels(UserEntity)
  @ApiOkResponse(UserApi.getMe.response.okResponse)
  getMe(@GetUser() user: User) {
    return user;
  }
  @Patch()
  @ApiOperation(UserApi.editUser.operation)
  @ApiOkResponse(UserApi.editUser.response.okResponse)
  @ApiBadRequestResponse(UserApi.editUser.response.badRequestResponse)
  @ApiForbiddenResponse(UserApi.editUser.response.forbiddenResponse)
  editUser(
    @GetUser('id')
    userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @ApiOperation(UserApi.deleteUser.operation)
  @ApiNoContentResponse(UserApi.deleteUser.response.noContentResponse)
  deleteUser(
    @GetUser('id')
    userId: number,
  ) {
    return this.userService.deleteUser(userId);
  }
}
