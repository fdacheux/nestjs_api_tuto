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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkEntity } from './entities';

@ApiTags('bookmarks')
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
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all bookmarks for that user',
  })
  @ApiExtraModels(BookmarkEntity)
  @ApiOkResponse({
    description: 'Successfully get all the bookmarks for that user',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(BookmarkEntity),
      },
    },
  })
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a bookmark',
  })
  @ApiCreatedResponse({
    description: 'Bookmark successfully created',
    schema: {
      $ref: getSchemaPath(BookmarkEntity),
    },
  })
  @ApiBadRequestResponse({
    description:
      'Title, description or link is not a string or/and title or link is empty',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', default: 400 },
        message: {
          type: 'array',
          example: [
            'title should not be an empty',
            'description must be a string',
          ],
        },
        error: { type: 'string', default: 'Bad request' },
      },
    },
  })
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
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

  @Delete(':id')
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
