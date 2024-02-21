import { Router } from "express";

import { router as userRouter } from "./user.router.js";
import { router as recipeRouter } from "./recipe.router.js";
import { router as ingredientRouter } from "./ingredient.router.js";
import { router as familyRouter } from "./family.router.js";
import { router as unitRouter } from "./unit.router.js";
import { router as historyRouter } from "./history.router.js";


export const router = Router();

// Main API routes
router.use(userRouter);
router.use(recipeRouter);
router.use(ingredientRouter);
router.use(familyRouter);
router.use(unitRouter);
router.use(historyRouter);
