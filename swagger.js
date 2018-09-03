const config = require('config');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = (app) => {

    const swaggerDefinition = {
        info: {
            title: 'Lucky Block API',
            version: '1.0.0',
            description: 'Restfull API',
        },
        host: config.get('back_host'),
        basePath: '/',
    };

    const options = {
        swaggerDefinition: swaggerDefinition,
        apis: ['./routes/*.js'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};