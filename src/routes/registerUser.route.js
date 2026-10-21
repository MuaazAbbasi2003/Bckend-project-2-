import { Router } from "express";
import { registerUser } from "../Controllers/registerUser.controller";
const registerUser = Router();

router.route("/register").post(registerUser);

export { registerUser };
