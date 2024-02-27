import { Router } from "express";

import IngredientController from "../controllers/ingredient.controller.js";
import { authenticateToken, authorizedByUserId, errorHandler as eh, isAdmin } from "../middlewares/index.js";


export const router = Router();

router.route("/ingredient")
  .get(eh(IngredientController.getAll.bind(IngredientController)))
  .post(authenticateToken,isAdmin,eh(IngredientController.create.bind(IngredientController)));

router.route("/ingredient/:id")
  .get(eh(IngredientController.getByPk.bind(IngredientController)))
  .patch(authenticateToken,isAdmin,eh(IngredientController.update.bind(IngredientController)))
  .delete(authenticateToken,isAdmin,eh(IngredientController.delete.bind(IngredientController)));

router.route("/recipe/:recipeId/ingredient/:ingredientId")
  .put(authenticateToken,eh(authorizedByUserId("recipeId", "recipe")),eh(IngredientController.addToRecipe.bind(IngredientController)))
  .patch(authenticateToken,eh(authorizedByUserId("recipeId", "recipe")),eh(IngredientController.updateToRecipe.bind(IngredientController)))
  .delete(authenticateToken,eh(authorizedByUserId("recipeId", "recipe")),eh(IngredientController.removeToRecipe.bind(IngredientController)));
