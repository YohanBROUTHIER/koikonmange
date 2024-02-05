import { Router } from "express";

import FamilyController from "../controllers/family.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/cards")
  .get(eh(FamilyController.getAll))
  .post(eh(FamilyController.create));

router.route("/cards/:id")
  .get(eh(FamilyController.get))
  .patch(eh(FamilyController.update))
  .delete(eh(FamilyController.delete));


