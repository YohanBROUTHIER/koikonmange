import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { authorizedByUserId, errorHandler as eh, authenticateToken, isDisconnected, getTokenData} from "../middlewares/index.js";

export const router = Router();

router.route("/:id")
  .patch(authenticateToken, eh(authorizedByUserId("id","user")), eh(UserController.update.bind(UserController)))
  .delete(authenticateToken, eh(authorizedByUserId("id","user")), eh(UserController.delete.bind(UserController)));

router.post("/signup", isDisconnected, eh(UserController.postSignup.bind(UserController)));
router.post("/signin", isDisconnected, eh(UserController.postSignin.bind(UserController)));
router.post("/reset-password", eh(UserController.postResetPassword.bind(UserController)));

router.patch("/account/:uuid", eh(UserController.patchActiveAccount.bind(UserController)));
router.patch("/password/:uuid", eh(UserController.patchResetPassword.bind(UserController)));

router.post("/token", getTokenData, eh(UserController.getRefreshToken.bind(UserController)));