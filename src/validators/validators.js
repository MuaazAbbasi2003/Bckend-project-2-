import { body } from "express-validator";

const userRegitorValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email not in proper form invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("username must be greater than 3 characters"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullName").optional().trim(),
  ];
};

export { userRegitorValidator };
