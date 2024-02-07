import { Router } from "express";

import HistoryController from "../controllers/history.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/history")
  .get(eh(HistoryController.getAll))
  .post(eh(HistoryController.create));

router.route("/history/:id")
  .get(eh(HistoryController.get))
  .patch(eh(HistoryController.update))
  .delete(eh(HistoryController.delete));

router.route("/history/:historyId/recipe/:RecipeId")
  .patch(eh(HistoryController.update))
  .delete(eh(HistoryController.delete))
  .put(eh(HistoryController.put));


