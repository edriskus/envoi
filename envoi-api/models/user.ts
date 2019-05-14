import * as bcrypt from "bcryptjs";
import * as mongoose from "mongoose";

import { IUser } from "../types/user";

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true, default: "CONSUMER" },
  firstName: { type: String, required: true },
  lastName: { type: String },
  activationToken: { type: String },
});

UserSchema.pre("save", function(next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // Hash the password using our new salt
    bcrypt.hash((user as any).password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Override the cleartext password with the hashed one
      (user as any).password = hash;
      next();
    });
  });
});

(UserSchema.methods as any).comparePassword = async function(
  candidatePassword: string
) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

export default mongoose.model("User", UserSchema);
