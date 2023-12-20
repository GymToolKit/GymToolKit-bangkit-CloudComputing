require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

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

// tools services
const tools = require('./api/tools');
const ToolsService = require('./services/postgres/toolsService');
const ToolsValidator = require('./validator/tools');

// feedback services
const feedback = require('./api/feedback');
const FeedbackService = require('./services/postgres/feedbackService');
const FeedbackValidator = require('./validator/feedback');

// uploads Service
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/storageService');
const UploadsValidator = require('./validator/upload');
const bucketName = 'dummybucket001121';
const keyFilename = path.resolve(__dirname, 'services', 'storage', 'key.json');

// predict Service
const predict = require('./api/predict');
const PredictService = require('./services/storage/predictService');
const modelPath = path.resolve(__dirname, 'services', 'storage', 'tfjs', 'model.json');


const init = async () =>{
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const toolsService = new ToolsService();
    const storageService = new StorageService(bucketName, keyFilename);
    const predictService = new PredictService(modelPath);
    const feedbackService = new FeedbackService();
    
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'Welcome to the root endpoint!';
      },
    });
  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
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
        usersService: usersService,
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
    {
      plugin: tools,
      options: {
        toolsService: toolsService,
        validator: ToolsValidator,
      },
    },
    {
      plugin: feedback,
      options: {
        feedbackService: feedbackService,
        validator: FeedbackValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        storageService: storageService,
        validator: UploadsValidator,
      },
    },
    {
      plugin: predict,
      options: {
        predictService: predictService,
        storageService,
        validator: UploadsValidator,
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