import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { authorizedBySessionId, errorHandler as eh, isConnected, isDisconnected } from "../middlewares/index.js";

export const router = Router();

router.route("/user/:id")
  .get(isConnected, authorizedBySessionId, eh(UserController.getByPk))
  .patch(isConnected, authorizedBySessionId, eh(UserController.update))
  .delete(isConnected, authorizedBySessionId, eh(UserController.delete));

router.post("/signup", isDisconnected, eh(UserController.postSignup));
router.post("/reset-password", isDisconnected, eh(UserController.postResetPassword));
router.post("/signin", isDisconnected, eh(UserController.postSignin));
router.post("/signout", isConnected, eh(UserController.postSignout));


