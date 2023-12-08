require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// client error
const ClientError = require('./exception/clientError');

// users services
const users = require('./api/users');
const UsersService = require('./services/postgres/usersService');
const UsersValidator = require('./validator/users');

// authentications services
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/authenticationsService');
const TokenManager = require('./tokenize/tokenManager');
const AuthenticationsValidator = require('./validator/authentications');

const init = async () =>{
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });
  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // strategy autentikasi jwt
  server.auth.strategy('gym_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },

    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      // Handling ClientError
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
    }
    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();