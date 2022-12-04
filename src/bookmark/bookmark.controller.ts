import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkApi } from './api/bookmark.api';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkEntity } from './entities';

@ApiTags('bookmarks')
@ApiBearerAuth()
@ApiUnauthorizedResponse(BookmarkApi.global.unauthorizedResponse)
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @ApiOperation(BookmarkApi.getBookmarks.operation)
  @ApiExtraModels(BookmarkEntity)
  @ApiOkResponse(BookmarkApi.getBookmarks.response.okResponse)
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  @ApiOperation(BookmarkApi.getBookmarkById.operation)
  @ApiOkResponse(BookmarkApi.getBookmarkById.response.okResponse)
  @ApiNotFoundResponse(BookmarkApi.getBookmarkById.response.notFound)
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  @ApiOperation(BookmarkApi.createBookmark.operation)
  @ApiCreatedResponse(BookmarkApi.createBookmark.response.created)
  @ApiBadRequestResponse(
    BookmarkApi.createBookmark.response.badRequest,
  )
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  @ApiOperation(BookmarkApi.editBookmarkById.operation)
  @ApiOkResponse(BookmarkApi.editBookmarkById.response.okResponse)
  @ApiBadRequestResponse(
    BookmarkApi.editBookmarkById.response.badRequest,
  )
  @ApiForbiddenResponse(
    BookmarkApi.editBookmarkById.response.forbiddenResponse,
  )
  @ApiNotFoundResponse(BookmarkApi.editBookmarkById.response.notFound)
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation(BookmarkApi.deleteBookmarkById.operation)
  @ApiNoContentResponse(
    BookmarkApi.deleteBookmarkById.response.noContentResponse,
  )
  @ApiForbiddenResponse(
    BookmarkApi.deleteBookmarkById.response.forbiddenResponse,
  )
  @ApiNotFoundResponse(
    BookmarkApi.deleteBookmarkById.response.notFound,
  )
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
