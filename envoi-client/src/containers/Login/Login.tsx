import React, { FormEvent } from "react";
import loginStyles from "./Login.tss";

import {
  Grid,
  Card,
  Button,
  TextField,
  WithStyles,
  withStyles,
  CardContent,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { Redirect } from "react-router";
import { IApiError } from "../../types/api";

interface ILoginState {
  username: string;
  password: string;
}

export interface ILoginStateProps {
  loggedIn: boolean;
  loading: boolean;
  error?: IApiError;
}

export interface ILoginDispatchProps {
  requestLogin(username: string, password: string): void;
}

type ILoginStyleProps = WithStyles<typeof loginStyles>;

type ILoginProps = ILoginStateProps & ILoginDispatchProps & ILoginStyleProps;

class Login extends React.PureComponent<ILoginProps, ILoginState> {
  state: ILoginState = {
    username: "",
    password: ""
  };

  render() {
    const { loading, error, classes } = this.props;
    const { username, password } = this.state;
    return (<>
      <Grid xs={12} md={3} item={true} />
      <Grid xs={12} md={6} item={true}>
        <Card>
          <CardContent className={classes.flex}>
            <Typography 
              variant="h2"
              gutterBottom={true}
            >Log in</Typography>
            <form 
              className={classes.flex} 
              onSubmit={this.handleSubmit}
            >
              <TextField
                label="User Name"
                value={username}
                name="username"
                onChange={this.handleUsernameChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={this.handlePasswordChange}
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                color="primary"
                disabled={loading}
                variant="contained"
              >
                Enter
              </Button>
            </form>
          </CardContent>
          {loading && <LinearProgress />}
        </Card>
      </Grid>
    </>);
  }

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { requestLogin } = this.props;
    const { username, password } = this.state;

    requestLogin(username, password);
  };

  private handleChange = (name: "username" | "password") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    this.setState({
      [name]: value
    } as any);
  };

  private handleUsernameChange = this.handleChange("username");
  private handlePasswordChange = this.handleChange("password");
}

export default withStyles(loginStyles)(Login);
