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
            $ref: '#/components/errorResult/Error',
          },
        },
        NotFound: {
          description: '존재하지 않는 리소스를 요청했습니다.',
          schema: {
            $ref: '#/components/errorResult/Error',
          },
        },
      },
      errorResult: {
        Error: {
          type: 'object',
          properties: {
            errMsg: {
              type: 'string',
              description: '에러 메시지 전달',
            },
          },
        },
      },
    },
    schemes: ['http', 'https'],
  },
  apis: ['src/controller/*Controller.{js,ts}'],
}
