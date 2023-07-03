import express, {Request, Response, NextFunction} from 'express';
import {body, validationResult} from 'express-validator'
import CustomValidationError from '../errors/validation-error'
import DBError from '../errors/db-error'

const router = express.Router();

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new CustomValidationError(errors.array()))
    }

    const { email, password } = req.body;

    console.log("creatin a user...")
    return next(new DBError())
})

export { router as signupRouter }
