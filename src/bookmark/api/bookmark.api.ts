import { getSchemaPath } from '@nestjs/swagger';
import { BookmarkEntity } from '../entities';

export const BookmarkApi = {
  global: {
    unauthorizedResponse: {
      description: 'User is not authorized to access this route',
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
    },
  },
  // ------------------- CREATE ------------------- //
  createBookmark: {
    operation: {
      summary: 'Create a bookmark',
    },
    response: {
      created: {
        description: 'Bookmark successfully created',
        schema: {
          $ref: getSchemaPath(BookmarkEntity),
        },
      },
      badRequest: {
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
      },
    },
  },

  // ------------------- READ ------------------- //
  // ********* All ********* //
  getBookmarks: {
    operation: {
      summary: 'Get all bookmarks for that user',
    },
    response: {
      okResponse: {
        description:
          'Successfully get all the bookmarks for that user',
        schema: {
          type: 'array',
          items: {
            $ref: getSchemaPath(BookmarkEntity),
          },
        },
      },
    },
  },

  // ********* One ********* //
  getBookmarkById: {
    operation: {
      summary: 'Get a specific bookmark using its id',
    },
    response: {
      okResponse: {
        description: 'User successfully get a specific bookmark',
        schema: {
          $ref: getSchemaPath(BookmarkEntity),
        },
      },
      notFound: {
        description: 'Bookmark with that id has not been found',
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              default: 404,
            },
            message: {
              type: 'string',
              default: 'Bookmark not found',
            },
            error: {
              type: 'string',
              default: 'Not Found',
            },
          },
        },
      },
    },
  },

  // ------------------- UPDATE ------------------- //
  editBookmarkById: {
    operation: {
      summary: 'Edit a bookmark',
    },
    response: {
      okResponse: {
        description: 'User successfully edited a bookmark',
        schema: {
          $ref: getSchemaPath(BookmarkEntity),
        },
      },
      badRequest: {
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
      },
      forbiddenResponse: {
        description:
          'Trying to edit a bookmark not linked to that user',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 403 },
            message: {
              type: 'string',
              default: 'Access to resources denied !',
            },
            error: { type: 'string', default: 'Forbidden' },
          },
        },
      },
      notFound: {
        description: 'Bookmark not found',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 404 },
            message: {
              type: 'string',
              example: 'Bookmark not found',
            },
            error: { type: 'string', default: 'Not found' },
          },
        },
      },
    },
  },

  // ------------------- DELETE ------------------- //

  deleteBookmarkById: {
    operation: {
      summary: 'Delete a bookmark',
    },
    response: {
      noContentResponse: {
        description: 'Bookmark deleted',
      },
      forbiddenResponse: {
        description:
          'Trying to edit a bookmark not linked to that user',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 403 },
            message: {
              type: 'string',
              default: 'Access to resources denied !',
            },
            error: { type: 'string', default: 'Forbidden' },
          },
        },
      },
      notFound: {
        description: 'Bookmark not found',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 404 },
            message: {
              type: 'string',
              example: 'Bookmark not found',
            },
            error: { type: 'string', default: 'Not found' },
          },
        },
      },
    },
  },
};
