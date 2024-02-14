import { Router } from "express";

import IngredientController from "../controllers/ingredient.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/ingredient")
  .get(eh(IngredientController.getAll.bind(IngredientController)))
  .post(eh(IngredientController.create.bind(IngredientController)));

router.route("/ingredient/:id")
  .get(eh(IngredientController.getByPk.bind(IngredientController)))
  .patch(eh(IngredientController.update.bind(IngredientController)))
  .delete(eh(IngredientController.delete.bind(IngredientController)));


router.route("/ingredient/:ingredientId/family/:familyId")
  .put(eh(IngredientController.addFamily))
  .delete(eh(IngredientController.removeFamily));

