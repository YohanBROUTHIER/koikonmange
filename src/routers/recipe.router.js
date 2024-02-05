import { Router } from "express";

import RecipeController from "../controllers/recipe.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/cards")
  .get(eh(RecipeController.getAll))
  .post(eh(RecipeController.create));

router.route("/cards/:id")
  .get(eh(RecipeController.get))
  .patch(eh(RecipeController.update))
  .delete(eh(RecipeController.delete));
