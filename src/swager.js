// Import required modules
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Define swagger options
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        basePath: '/',
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Adjust this based on your authentication mechanism
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: [
        path.resolve(__dirname, '../src/routes/doc.route.js'),
        path.resolve(__dirname, '../src/routes/auth.route.js'),
        path.resolve(__dirname, '../src/routes/car.route.js'),
    ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Define Swagger definitions for your models
swaggerSpec.definitions = {
    Car: {
        type: 'object',
        properties: {
            user_id: { type: 'string' },
            make: { type: 'string' },
            model: { type: 'string' },
            variant: { type: 'string' },
            year: { type: 'string' },
            color: { type: 'string' },
            category: { type: 'string' },
            registration_no: { type: 'string' },
        },
        required: ['user_id', 'make', 'model', 'variant', 'year', 'color', 'category', 'registration_no'],
    },
    UserRegistration: {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
        },
        required: ['firstName', 'lastName', 'email'],
    },
    UserLogin: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
        },
        required: ['email', 'password'],
    },
    User: {
        type: 'object',
        properties: {
            user_id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
        },
    },
    token: {
        type: 'string',
    },
    GetAllCarsByUserIdRequest: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            user_id: { type: 'string' },
            pageSize: { type: 'number' },
            category: { type: 'string' },
        },
        required: ['page', 'user_id', 'pageSize', 'category'],
    },
};

// Export middleware for use in Express
module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerSpec),
};
