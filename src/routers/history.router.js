import { Router } from "express";

import HistoryController from "../controllers/history.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/history")
  .get(eh(HistoryController.getAll.bind(HistoryController)))
  .post(eh(HistoryController.create.bind(HistoryController)));

router.route("/history/:id")
  .get(eh(HistoryController.getByPk.bind(HistoryController)))
  .delete(eh(HistoryController.delete.bind(HistoryController)));

router.route("/history/:historyId/recipe/:recipeId")
  .put(eh(HistoryController.addRecipe.bind(HistoryController)))
  .patch(eh(HistoryController.updateRecipe.bind(HistoryController)))
  .delete(eh(HistoryController.removeRecipe.bind(HistoryController)));


