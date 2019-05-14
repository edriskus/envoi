import { IUserData } from "../../types/user";
import { IAppReduxState } from "../../types/global";

export const mapUserData = (state: IAppReduxState): IUserData => ({
  loggedIn: !!state.user.token,
  credits: state.user.credits,
  user: {
    username: state.user.username,
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    type: state.user.type,
  },
});