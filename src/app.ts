import express, { type Application, json } from "express";
import cookieParser from "cookie-parser";
import config from "config";
import corsMiddleware from "@middlewares/cors";
import morgan from "morgan";
// import routes
import userRoutes from "@routes/user.routes";
import authRoutes from "@routes/auth.routes";
import categoryRoutes from "@routes/category.routes";

const app: Application = express();

app.set("port", config.port);
app.set("apiURL", config.port + config.apiVersion);

app.disable("x-powered-by");

//Middlewares
app.use(corsMiddleware({ acceptedOrigins: config.cors.acceptedOrigins })); // CORS
app.use(cookieParser());
app.use(json());
app.use(morgan("dev")); // Logger

const apiVersion = config.apiVersion;

//Routes
app.get(`${apiVersion}/`, (_req, res) => {
  res.status(200).json({
    success: true,
    code: 200,
    message: "Welcome to the API",
  });
});

app.use(`${apiVersion}/users`, userRoutes);
app.use(`${apiVersion}/auth`, authRoutes);
app.use(`${apiVersion}/categories`, categoryRoutes);

// export constants
export const PORT: string = app.get("port");
export const API_URL: string = app.get("apiURL");
export const APP_URL: string = config.APP_URL;

export default app;
