const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config();

function swaggerConfig(app){

  const swaggerDocument = swaggerJsdoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Divar_backend",
        description: "Divar App and website",
        version: "1.0.0"
      },
      servers : [{
        url : `${process.env.BASEURL}:${process.env.PORT}`
      }],
      components:{
        securitySchemes:{
            BearerAuth:{
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT" 
            }
        }
      },
      security: [{BearerAuth: []}]
    },
    apis: []
  });
  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/", swaggerUi.serve, swagger )
}



module.exports = swaggerConfig