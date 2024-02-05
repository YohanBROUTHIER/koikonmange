// Import NPM dependencies
import express from "express";
import cors from "cors";

// Import local dependencies
import { router as apiRouter } from "./routers/index.js";
import { bodySanitizer, errorMiddleware, notFoundMiddleware } from "./middlewares/index.js";

// Create Express App
const app = express();

// Allow some Cross origin requests
app.use(cors({ origin: process.env.CORS })); // * = n'importe quel domaine ! A changer en production

// Servir statiquement le dossier /dist pour que le client puisse récupérer le code client !
app.use(express.static("./dist"));

// Add body parser
app.use(express.urlencoded({ extended: true })); // Ce body parser est capable de parser les body au format application/x-www-urlencoded (eg, les body envoyé par un <form> HTML)
app.use(express.json()); // Ce body parser parse les body au format application/json

// Generalisation du contrôle des inputs contre les potentielles injections XSS
app.use(bodySanitizer);

// Definit le router apiRouter pour les routes commencant par /api
app.use("/api", apiRouter);

// Not Found Middleware (404)
app.use(notFoundMiddleware);

// gestionnaire centralisé d'erreurs
app.use(errorMiddleware);

export default app;