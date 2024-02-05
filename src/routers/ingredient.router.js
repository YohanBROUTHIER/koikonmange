import { Router } from "express";

import IngredientController from "../controllers/ingredient.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/cards")
  .get(eh(IngredientController.getAll))
  .post(eh(IngredientController.create));

router.route("/cards/:id")
  .get(eh(IngredientController.get))
  .patch(eh(IngredientController.update))
  .delete(eh(IngredientController.delete));


