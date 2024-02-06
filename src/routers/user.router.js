import { Router } from "express";

import UserController from "../controllers/user.controller.js";
import { errorHandler as eh, isConnected, isDisconnected } from "../middlewares/index.js";


export const router = Router();

router.route("/signup")
  .post(isDisconnected, eh(UserController.postSignup));

router.route("/reset-password")
  .post(eh(UserController.postResetPassword));

router.route("/signin")
  .post(isDisconnected, eh(UserController.postSignin));

router.get("/signout", isConnected, UserController.getSignout);


