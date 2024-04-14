import { Router } from "express";
import FamilyController from "../controllers/family.controller.js";
import { authenticateToken, errorHandler as eh, isAdmin } from "../middlewares/index.js";

export const router = Router();

router.route("/")
  .get(eh(FamilyController.getAll.bind(FamilyController)))
  .post(authenticateToken,isAdmin,eh(FamilyController.create.bind(FamilyController)));

router.route("/:id")
  .get(eh(FamilyController.getByPk.bind(FamilyController)))
  .patch(authenticateToken,isAdmin,eh(FamilyController.update.bind(FamilyController)))
  .delete(authenticateToken,isAdmin,eh(FamilyController.delete.bind(FamilyController)));

router.route("/:familyId/ingredient/:ingredientId")
  .put(authenticateToken,isAdmin,eh(FamilyController.addToIngredient.bind(FamilyController)))
  .delete(authenticateToken,isAdmin,eh(FamilyController.removeToIngredient.bind(FamilyController)));
