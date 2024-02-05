import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { errorHandler as eh } from "../middlewares/index.js";


export const router = Router();

router.route("/cards")
  .get(eh(UserController.getAll))
  .post(eh(UserController.create));

router.route("/cards/:id")
  .get(eh(UserController.get))
  .patch(eh(UserController.update))
  .delete(eh(UserController.delete));


