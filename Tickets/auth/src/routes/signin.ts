import express from "express";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import RequestValidationError from "../errors/validation-error"

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(new RequestValidationError(errors.array()));
    }
  }
);

export { router as signinRouter };
