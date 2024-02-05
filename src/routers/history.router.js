import { Router } from "express";

import Historyontroller from "../controllers/history.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/cards")
  .get(eh(Historyontroller.getAll))
  .post(eh(Historyontroller.create));

router.route("/cards/:id")
  .get(eh(Historyontroller.get))
  .patch(eh(Historyontroller.update))
  .delete(eh(Historyontroller.delete));


