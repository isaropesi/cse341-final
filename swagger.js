const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TaskFlow API',
            version: '1.0.0',
            description: 'A comprehensive project and task management API built with Node.js, Express, and MongoDB. This API enables teams to organize work, collaborate efficiently, and track project progress.',
            contact: {
                name: 'TaskFlow Team',
                email: 'support@taskflow.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://cse341-final-kd0a.onrender.com',
                description: 'Production server (Render)'
            }
        ],
        tags: [
            {
                name: 'Projects',
                description: 'Project management endpoints'
            },
            {
                name: 'Tasks',
                description: 'Task management endpoints'
            },
            {
                name: 'Comments',
                description: 'Comment management endpoints'
            },
            {
                name: 'Users',
                description: 'User management endpoints (OAuth)'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
