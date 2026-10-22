import { Router } from "express";
import { login, registerUser } from "../Controllers/registerUser.controller.js";
import { validate } from "../middelware/validator.middelware.js";
import {
  userRegitorValidator,
  userLogginVallidator,
} from "../validators/validators.js";
import { verifyJWT } from "../middelware/registerUser.middelware.js";
import { logout } from "../Controllers/registerUser.controller.js";
const userRouter = Router();

userRouter
  .route("/register")
  .post(userRegitorValidator(), validate, registerUser);

userRouter.route("/login").post(userLogginVallidator(), validate, login);
userRouter.route("/logout").post(verifyJWT, logout);

export { userRouter };
