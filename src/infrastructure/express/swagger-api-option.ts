export default {
  swaggerDefinition: {
    info: {
      title: 'What do you say API TEST',
      version: '1.0.0',
      description: 'API Test',
    },
    basePath: '/',
    components: {
      res: {
        BadRequest: {
          description: '잘못된 요청입니다.',
          schema: {
            $ref: '#/components/errorResult/BadRequest',
          },
        },
        NotFound: {
          description: '존재하지 않는 리소스를 요청했습니다.',
          schema: {
            $ref: '#/components/errorResult/NotFound',
          },
        },
        InternalServerError: {
          description: '서버 에러',
          schema: {
            $ref: '#/components/errorResult/Error',
          },
        },
      },
      errorResult: {
        BadRequest: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'array',
              example: "[ { isString: 'contents는 string값이어야 합니다.' } ]",
            },
            data: {
              type: 'object',
              description: '{}',
            },
          },
        },
        NotFound: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'fail',
            },
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Not found Entity',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: '에러 메시지 전달',
            },
          },
        },
      },
    },
    definitions: {
      Greeting: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
          },
          situation: {
            type: 'string',
          },
          honorific: {
            type: 'string',
          },
          sentenceLength: {
            type: 'string',
          },
          contents: {
            type: 'string',
          },
          bookmarkCount: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      Greetings: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              $ref: '#/definitions/Greeting',
            },
          },
          start: {
            type: 'integer',
            format: 'int32',
          },
          count: {
            type: 'integer',
            format: 'int32',
          },
          total: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      CreatedGreeting: {
        type: 'object',
        properties: {
          createdGreetingId: {
            type: 'number',
            format: 'int32',
          },
        },
      },
    },
    schemes: ['http', 'https'],
  },
  apis: ['src/infrastructure/express/*.{js,ts}', 'src/controller/*Controller.{js,ts}'],
}
