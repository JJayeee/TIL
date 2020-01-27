const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');

const router = express.Router();

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: 'Routes', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'REST API with Express',
  },
  host: 'localhost:8001', // Host (optional)
  basePath: '/', // Base path (optional)
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'haveCookie',
      }
    }
  },
  security: {
    cookieAuth: []
  }
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;