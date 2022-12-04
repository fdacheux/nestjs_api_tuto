import { getSchemaPath } from '@nestjs/swagger';
import { UserEntity } from '../entities';

export const UserApi = {
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

  // ------------------- READ ------------------- //
  getMe: {
    operation: {
      summary: 'Get a user info',
    },
    response: {
      okResponse: {
        description: 'The user is authorized to access this route.',
        schema: {
          type: 'object',
          $ref: getSchemaPath(UserEntity),
        },
      },
    },
  },

  // ------------------- UPDATE ------------------- //
  editUser: {
    operation: {
      summary: 'Edit user info',
    },
    response: {
      okResponse: {
        description:
          'The user has successfully updated his/her informations.',
        schema: {
          type: 'object',
          $ref: getSchemaPath(UserEntity),
        },
      },
      badRequestResponse: {
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
      },
    },
  },

  // ------------------- DELETE ------------------- //
  deleteUser: {
    operation: {
      summary: 'Delete a user',
    },
    response: {
      noContentResponse: {
        description: 'User and all the users bookmarks deleted',
      },
    },
  },
};
