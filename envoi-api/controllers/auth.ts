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
    validateRequired(username, "Username"),
    validateRequired(password, "Password"),
    validatePassword(password)
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
        firstName: (user as any).firstName,
        lastName: (user as any).lastName,
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
    validateRequired(email, "Email"),
    validateEmail(email),
    validateRequired(username, "Username"),
    validateRequired(password, "Password"),
    validatePassword(password),
    validateRequired(firstName, "First Name"),
    validateTrue(acceptTerms, '"Accept terms"')
  );
  if (errors) {
    throwValidationError(errors);
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
