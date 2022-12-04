import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthApi } from './api/auth.api';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation(AuthApi.signUp.operation)
  @ApiCreatedResponse(AuthApi.signUp.response.createdResponse)
  @ApiBadRequestResponse(AuthApi.signUp.response.badRequestResponse)
  @ApiForbiddenResponse(AuthApi.signUp.response.forbiddenResponse)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation(AuthApi.signin.operation)
  @ApiOkResponse(AuthApi.signin.response.okResponse)
  @ApiBadRequestResponse(AuthApi.signin.response.badRequestResponse)
  @ApiForbiddenResponse(AuthApi.signin.response.forbiddenResponse)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
