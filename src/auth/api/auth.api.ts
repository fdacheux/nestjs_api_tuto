const accessTokenProperty = {
  access_token: {
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY2OTg4OTE4MiwiZXhwIjoxNjY5ODkwMDgyfQ.j0jK-K7NdomHZg4FLHSXu5t2CUgHZ0Cet5IAtDLq2fs',
  },
};

export const AuthApi = {
  signUp: {
    operation: { summary: 'Create user account' },
    response: {
      createdResponse: {
        description: 'User successfully created',
        schema: {
          type: 'object',
          properties: {
            ...accessTokenProperty,
          },
        },
      },
      badRequestResponse: {
        description:
          'Email or/and password field(s) empty OR/AND invalid email or/and password format : will return an array with the appropriate informations',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 400 },
            message: {
              type: 'array',
              example: [
                'email should not be empty',
                'email must be an email',
                'password should not be empty',
                'password  must be a string',
              ],
            },
            error: { type: 'string', default: 'Bad request' },
          },
        },
      },
      forbiddenResponse: {
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
      },
    },
  },
  signin: {
    operation: { summary: 'Log user' },
    response: {
      okResponse: {
        description: 'Logged in',
        schema: {
          type: 'object',
          properties: {
            ...accessTokenProperty,
          },
        },
      },
      badRequestResponse: {
        description:
          'Email or/and password field(s) empty OR/AND invalid email or/and password format : will return an array with the appropriate informations',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 400 },
            message: {
              type: 'array',
              example: [
                'email should not be empty',
                'email must be an email',
                'password should not be empty',
                'password  must be a string',
              ],
            },
            error: { type: 'string', default: 'Bad request' },
          },
        },
      },
      forbiddenResponse: {
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
      },
    },
  },
};
