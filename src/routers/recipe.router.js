import { Router } from "express";

import RecipeController from "../controllers/recipe.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";

export const router = Router();

router.route("/recipe")
  .get(eh(RecipeController.getAll.bind(RecipeController)))
  .post(eh(RecipeController.create.bind(RecipeController)));

router.route("/recipe/:id")
  .get(eh(RecipeController.getByPk.bind(RecipeController)))
  .patch(eh(RecipeController.update.bind(RecipeController)))
  .delete(eh(RecipeController.delete.bind(RecipeController)));
