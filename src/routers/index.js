import { Router } from "express";

import { router as userRouter } from "./user.router.js";
import { router as recipeRouter } from "./recipe.router.js";
import { router as ingredientRouter } from "./ingredient.router.js";
import { router as familyRouter } from "./family.router.js";
import { router as unitRouter } from "./unit.router.js";
import { router as historyRouter } from "./history.router.js";
import notFoundMiddleware from "../middlewares/notFoundMiddleware.js";


export const router = Router();

// Main API routes
router.use("/user", userRouter);
router.use("/recipe", recipeRouter);
router.use("/ingredient", ingredientRouter);
router.use("/family", familyRouter);
router.use("/unit", unitRouter);
router.use("/history", historyRouter);

router.use(notFoundMiddleware);