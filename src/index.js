// Import NPM dependencies
import express from "express";
import cors from "cors";

// Import local dependencies
import { router as apiRouter } from "./routers/index.js";
import { bodySanitizer, errorMiddleware, notFoundMiddleware, sessionMiddleware } from "./middlewares/index.js";

// Create Express App
const app = express();

// Allow some Cross origin requests
app.use(cors({ origin: process.env.CORS }));

app.use(sessionMiddleware.session); //Session parameters
app.use(sessionMiddleware.sessionInit); //Add to res.locals

// Statically serve the /dist folder
app.use(express.static("./dist"));

// Add body parser
app.use(express.urlencoded({ extended: true })); // Body parser for application/x-www-urlencoded
app.use(express.json()); // Body parser for application/json

// XSS injection protection in req.body
app.use(bodySanitizer);

// Prefix api routes with "/api"
app.use("/api", apiRouter);

// Not Found Middleware (404)
app.use(notFoundMiddleware);

// Centralized error manager
app.use(errorMiddleware);

export default app;