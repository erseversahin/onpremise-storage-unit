import { Express } from 'express';
//Express Swagger Generator
import ExpressSwaggerGenerator from 'express-swagger-producer';

/* EXPRESS SWAGGER OPTIONS */
const swaggerOptions: object = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0'
        },
        swagger: '2.0',
        //openapi: '3.0.0',
        host: 'localhost',
        basePath: '/api',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: ''
            }
        },
        security: [
            {
                JWT: []
            }
        ]
    },
    basedir: __dirname, //app absolute path
    files: ['../../routes/**/*.ts', '../../services/**/*.ts'] //Path to the API handle folder
};


//SWAGGER DATA LOAD ENABLER MIDDLEWARE FOR BROWSER

const EnableSwaggerOnBrowser: { (app: Express): void } = (app: Express) => {
    app.get("/api-docs", (req, res, next) => {
        res.set(
            "Content-Security-Policy",
            "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:;"
        )
        next();
    })
}


/* EXPRESS SWAGGER CONFIGURATION */
const SwaggerDocsCreator = (app: Express) => {
    const ExpressSwagger = ExpressSwaggerGenerator(app);
    EnableSwaggerOnBrowser(app);
    ExpressSwagger(swaggerOptions);
}

export default SwaggerDocsCreator;