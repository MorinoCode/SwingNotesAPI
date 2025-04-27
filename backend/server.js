import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/connectDB.js";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import isUserLoginMiddleware from "./controll/isUserLoginMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config.js";




// Ladda miljövariabler
dotenv.config();

// Konstanter
const app = express();
const PORT = process.env.PORT || 8091;

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Anslut till databasen
connectDB();

// API-routes

app.use("/api/user", userRouter); // Hantera konto & inloggning
app.use("/api/notes", isUserLoginMiddleware, noteRouter); // Skyddad anteckningsroute

// Fångar 404 för icke-existerande routes
app.use((req, res, next) => {
  res.status(404).json({ message: "❌ Sidan hittades inte." });
});

// Global error handler
app.use(errorHandlerMiddleware);

// Starta server
app.listen(PORT, () => {
  console.log(`✅ Servern körs på http://localhost:${PORT}`);
});
