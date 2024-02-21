import { Router } from "express";
import UnitController from "../controllers/unit.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";

export const router = Router();

router.route("/unit")
  .get(eh(UnitController.getAll.bind(UnitController)));
