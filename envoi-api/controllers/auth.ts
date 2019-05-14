import * as jwt from "jsonwebtoken";
import * as uuidv4 from "uuid/v4";
import * as mailgun from "mailgun-js"

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
import { throwServerError, failableController, throwNotFound } from "../helpers/controller";
import { BadRequestError } from "../types/controller";

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
  if (user && (user as any).activationToken) {
    const error = new BadRequestError("User");
    error.message = "User is not activated. Please check your email.";
    throw error;
  }
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

  const activationToken = uuidv4();

  const user = await User.create({
    username,
    password,
    firstName,
    lastName,
    email,
    activationToken,
  });
  if (user) {
    var data = {
      from: 'Envoi.ts <noreply@envoi.riskus.lt>',
      to: email,
      subject: 'Envoi.ts Account Activation',
      text: `Envoi.ts activation link: https://api.envoi.riskus.lt/auth/activate/${activationToken}`
    };
    const mgInstance = mailgun({
      apiKey: process.env.MAILGUN_API_KEY, 
      domain: "riskus.lt",
    });
    mgInstance.messages().send(data, function(error) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Error sending email"
        });
      } else {
        res.json({ status: 200 });
      }
    });
  } else {
    throwServerError();
  }

}

export async function doActivate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.params;
  const user = await User.findOne({ activationToken: token }, "activationToken").catch(() =>
    throwNotFound("User")
  );
  user.activationToken = null;
  await user.save();
  return res.redirect('https://envoi.riskus.lt/login')
};