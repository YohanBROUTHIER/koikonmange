import { Router } from "express";

import HistoryController from "../controllers/history.controller.js";
import { authenticateToken, authorizedByUserId, errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/history")
  .get(authenticateToken,eh(HistoryController.getAll.bind(HistoryController)))
  .post(authenticateToken,eh(HistoryController.create.bind(HistoryController)));

router.route("/history/:id")
  .get(authenticateToken,eh(authorizedByUserId("id","history")),eh(HistoryController.getByPk.bind(HistoryController)))
  .delete(authenticateToken,eh(authorizedByUserId("id","history")),eh(HistoryController.delete.bind(HistoryController)));

router.route("/history/:historyId/recipe/:recipeId")
  .put(authenticateToken,eh(authorizedByUserId("historyId","history")),eh(HistoryController.addRecipe.bind(HistoryController)))
  .patch(authenticateToken,eh(authorizedByUserId("historyId","history")),eh(HistoryController.updateRecipe.bind(HistoryController)))
  .delete(authenticateToken,eh(authorizedByUserId("historyId","history")),eh(HistoryController.removeRecipe.bind(HistoryController)));
