import * as passport from "passport";
import * as passportJWT from "passport-jwt";

import User from "../models/user";

export function setupPassport() {
  const JwtStrategy = passportJWT.Strategy;
  const ExtractJwt = passportJWT.ExtractJwt;

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
    issuer: "envoi.riskus.lt",
    audience: "envoi.riskus.lt"
  };

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
}
