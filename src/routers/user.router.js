import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { authorizedByUserId, errorHandler as eh, authenticateToken, isDisconnected, getTokenData} from "../middlewares/index.js";

export const router = Router();

router.route("/user/:id")
  .patch(authenticateToken, authorizedByUserId, eh(UserController.update.bind(UserController)))
  .delete(authenticateToken, authorizedByUserId, eh(UserController.delete.bind(UserController)));

router.post("/signup", isDisconnected, eh(UserController.postSignup.bind(UserController)));
router.post("/signin", isDisconnected, eh(UserController.postSignin.bind(UserController)));
router.post("/reset-password", eh(UserController.postResetPassword.bind(UserController)));

router.patch("/user/account/:uuid", eh(UserController.patchActiveAccount.bind(UserController)));
router.patch("/user/password/:uuid", eh(UserController.patchResetPassword.bind(UserController)));

router.get("/user/token", getTokenData, eh(UserController.getRefreshToken.bind(UserController)));