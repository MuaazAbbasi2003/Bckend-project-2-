import { Router } from "express";
import { registerUser } from "../Controllers/registerUser.controller";
import { validate } from "../middelware/validator.middelware.js";
import { userRegitorValidator } from "../validators/validators.js";
const registerUser = Router();

router.route("/register").post(userRegitorValidator(), validate, registerUser);

export { registerUser };
