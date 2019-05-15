import React  from "react"; 
import loginStyles from "./Login.tss";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { IApiError } from "../../types/api";
import { hasError, formatError } from "../../helpers/validations";

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
  clearError(): void;
}

type ILoginStyleProps = WithStyles<typeof loginStyles>;

type ILoginProps = ILoginStateProps & ILoginDispatchProps & ILoginStyleProps;

class Login extends React.PureComponent<ILoginProps, ILoginState> {
  state: ILoginState = {
    username: "",
    password: "",
  };

  componentDidMount() {
    const { clearError } = this.props;
    clearError();
  }

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
            <ErrorMessage error={error} />
            <form 
              className={classes.flex} 
              onSubmit={this.handleSubmit}
            >
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                error={hasError("username", error)}
                helperText={formatError("username", error)}
                label="User Name"
                value={username}
                name="username"
                onChange={this.handleUsernameChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                error={hasError("password", error)}
                helperText={formatError("password", error)}
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
                className={classes.paddedEnter}
              >
                Enter
              </Button>
              <div className={classes.registerFlex}>
                <Typography 
                  variant="overline"
                >
                  Don't have an account?
                </Typography>
                <Link to="/join">
                  <Button
                    size="small"
                    type="button"
                    color="primary"
                    variant="outlined"
                    className={classes.registerButton}
                  >
                    Join
                  </Button>
                </Link>
              </div>
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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { error, clearError } = this.props;
    const { value } = event.target;
    this.setState({
      [name]: value,
    } as any);
    if (error) {
      clearError();
    }
  };

  private handleUsernameChange = this.handleChange("username");
  private handlePasswordChange = this.handleChange("password");
}

export default withStyles(loginStyles)(Login);
