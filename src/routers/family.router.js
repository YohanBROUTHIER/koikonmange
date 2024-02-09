import { Router } from "express";
import FamilyController from "../controllers/family.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";

export const router = Router();

router.route("/family")
  .get(eh(FamilyController.getAll.bind(FamilyController)))
  .post(eh(FamilyController.create.bind(FamilyController)));

router.route("/family/:id")
  .get(eh(FamilyController.getByPk.bind(FamilyController)))
  .patch(eh(FamilyController.update.bind(FamilyController)))
  .delete(eh(FamilyController.delete.bind(FamilyController)));


