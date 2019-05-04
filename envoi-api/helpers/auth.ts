import * as passport from "passport";
import * as passportJWT from "passport-jwt";

import User from "../models/user";
import { BadRequestError } from "../types/controller";

/**
 * 
 */
export function setupPassport() {
  const JwtStrategy = passportJWT.Strategy;
  const ExtractJwt = passportJWT.ExtractJwt;
  
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: "envoi.riskus.lt",
    audience: "envoi.riskus.lt"
  };

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne(
        { _id: jwt_payload.sub },
        "_id username firstName lastName email",
        function(err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // Or you could create a new account
          }
        }
      );
    })
  );
}

/**
 * 
 */
export function throwLoginError() {
  const error = new BadRequestError('User');
  error.message = 'Username or password is incorrect!';
  throw error;
}

/**
 * Logged in middleware
 */
export function loggedIn() {
  return passport.authenticate('jwt', { session: false });
}