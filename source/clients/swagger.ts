import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import Logger from "./logger";

const logger = Logger.instance;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        UserRegistration: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              format: "password",
            },
          },
          required: ["firstName", "lastName", "email", "password"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./source/api/**/*.router.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
