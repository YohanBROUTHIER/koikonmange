import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { authorizedByUserId, errorHandler as eh, authenticateToken, isDisconnected} from "../middlewares/index.js";

export const router = Router();

router.route("/user/:id")
  .get(authenticateToken, authorizedByUserId, eh(UserController.getByPk))
  .patch(authenticateToken, authorizedByUserId, eh(UserController.update))
  .delete(authenticateToken, authorizedByUserId, eh(UserController.delete));

router.post("/signup", isDisconnected, eh(UserController.postSignup));
router.post("/signin", isDisconnected, eh(UserController.postSignin));
router.post("/reset-password", eh(UserController.postResetPassword));

router.patch("/user/account/:uuid", eh(UserController.patchActiveAccount));
router.patch("/user/password/:uuid", eh(UserController.patchResetPassword));
