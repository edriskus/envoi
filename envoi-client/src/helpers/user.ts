import { UserType } from "../types/user";

export function isCreator(userType: UserType) {
  return userType === "CREATOR";
}

export function isConsumer(userType: UserType) {
  return userType === "CONSUMER";
}
