import { Router } from "express";

import IngredientController from "../controllers/ingredient.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/ingredients")
  .get(eh(IngredientController.getAll))
  .post(eh(IngredientController.create));

router.route("/ingredients/:id")
  .get(eh(IngredientController.get))
  .patch(eh(IngredientController.update))
  .delete(eh(IngredientController.delete));


router.route("/ingredient/:ingredientId/family/:familyId")
  .put(eh(HistoryController.put))
  .delete(eh(IngredientController.delete));

