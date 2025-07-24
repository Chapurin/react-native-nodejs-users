import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const { version } = require('../package.json');

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API Documentation',
            version,
            description: 'API для аутентификации и управления пользователями',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
    // Swagger UI
    app.use('/api-v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // JSON endpoint
    app.get('/api-v1/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Swagger docs available at /api-v1/api-docs`);
}

export default setupSwagger;
