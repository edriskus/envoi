import * as jwt from "jsonwebtoken";

import User from "../models/user";

import {
  validateTrue,
  validateEmail,
  validateRequired,
  validatePassword,
  combineValidations,
  throwValidationError
} from "../helpers/validations";
import { throwLoginError } from "../helpers/auth";
import { Request, Response, NextFunction } from "express";
import { throwServerError, failableController } from "../helpers/controller";

/**
 *
 * @param req
 * @param res
 */
export async function doLogin(req: Request, res: Response) {
  const { username, password } = req.body as any;

  const errors = combineValidations(
    validateRequired(username, "username", "Username"),
    validateRequired(password, "password", "Password"),
    validatePassword(password, "password")
  );
  if (errors) {
    throwValidationError(errors);
  }

  const user = await User.findOne({ username })
    .exec()
    .catch(throwLoginError);
  if (user) {
    const isMatch = await (user as any).comparePassword(password);
    if (isMatch) {
      const token = jwt.sign(
        {
          sub: user._id
        },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          issuer: "envoi.riskus.lt",
          audience: "envoi.riskus.lt"
        }
      );
      res.json({
        token,
        username: (user as any).username,
        email: (user as any).email,
        type: (user as any).type,
        firstName: (user as any).firstName,
        lastName: (user as any).lastName
      });
    } else {
      throwLoginError();
    }
  } else {
    throwLoginError();
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function doRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    acceptTerms
  } = req.body as any;

  const errors = combineValidations(
    validateRequired(email, "email", "Email"),
    validateEmail(email, "email"),
    validateRequired(username, "username", "Username"),
    validateRequired(password, "password", "Password"),
    validatePassword(password, "password"),
    validateRequired(firstName, "firstName", "First Name"),
    validateTrue(acceptTerms, "acceptTerms", '"Accept terms"')
  );
  if (errors) {
    throwValidationError(errors);
  }

  const existingUserCount = await User.count({ username });
  if (existingUserCount > 0) {
    throwValidationError([{
      name: "username",
      message: "User with this username already exists",
    }]);
  }

  const existingEmailCount = await User.count({ email });
  if (existingEmailCount > 0) {
    throwValidationError([{
      name: "email",
      message: "User with this email already exists",
    }]);
  }

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
    email
  });
  if (user) {
    failableController(doLogin)(req, res, next);
  } else {
    throwServerError();
  }
}
