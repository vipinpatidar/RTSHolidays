import express from "express";
import {
  postLoginUser,
  postRegisterUser,
  postLogoutUser,
  postNewTokensUser,
  getLoggedInUser,
} from "../controllers/user.controller";
import { schemaValidatorMid } from "../middlewares/schemaValidator";
import { registerSchema, loginSchema } from "../validator/schemas";
import { verifyJwtToken } from "../middlewares/verifyToken";

export const userRouter = express.Router();

userRouter
  .route("/register")
  .post(schemaValidatorMid(registerSchema), postRegisterUser);

userRouter.route("/login").post(schemaValidatorMid(loginSchema), postLoginUser);

userRouter.route("/logout").post(postLogoutUser);

userRouter.route("/new-token").post(postNewTokensUser);

userRouter.route("/get-loggedIn-user").get(verifyJwtToken, getLoggedInUser);
