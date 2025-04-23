
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API-dokumentation för Notes App",
    },
    servers: [
      {
        url: "http://localhost:8000", // Anpassa om du använder annan port
      },
    ],
  },
  apis: ["./routes/*.js"], // sökvägen till alla dina routes med Swagger-kommentarer
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
