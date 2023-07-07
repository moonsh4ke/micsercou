import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import CustomValidationError from "../errors/validation-error";
import { User } from "../models/user";
import {BadRequestError} from "../errors/bad-request-error"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new CustomValidationError(errors.array()));
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email in use');
      const err = new BadRequestError("Email in use");
      return next(err);
    }

    const user = User.build({email, password})
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({id: user.id, email: user.email}, 'asdf');

    // Store it on session
    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user);
  }
);

export { router as signupRouter };
