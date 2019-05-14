import React from "react";
import joinStyles from "./Join.tss";

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
import { IApiError } from "../../types/api";
import { hasError, formatError } from "../../helpers/validations";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

interface IJoinState {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IJoinStateProps {
  registered: boolean;
  loggedIn: boolean;
  loading: boolean;
  error?: IApiError;
}

export interface IJoinDispatchProps {
  clearError(): void;
  requestJoin(
    username: string,
    password: string,
    email: string,
    acceptTerms: boolean,
    firstName: string,
    lastName?: string,
  ): void;
}

type IJoinStyleProps = WithStyles<typeof joinStyles>;

type IJoinProps = IJoinStateProps & IJoinDispatchProps & IJoinStyleProps;

class Join extends React.PureComponent<IJoinProps, IJoinState> {
  state: IJoinState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  componentDidMount() {
    const { clearError } = this.props;
    clearError();
  }

  render() {
    const { loading, error, classes, registered } = this.props;    
    const { username, password, firstName, lastName, email } = this.state;
    return (
      <>
        <Grid xs={12} md={3} item={true} />
        <Grid xs={12} md={6} item={true}>
          <Card>
            <CardContent className={classes.flex}>
              <Typography variant="h2" gutterBottom={true}>
                Join
              </Typography>
              {registered ? (
                <Typography align="center">
                  Registration successful. Please check your email for an activation link.
                </Typography>
              ) : (<>
                <ErrorMessage error={error} />
                <form 
                  className={classes.flex} 
                  onSubmit={this.handleSubmit}
                  noValidate={true}
                >
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required={true}
                    label="First Name"
                    value={firstName}
                    name="firstname"
                    error={hasError("firstName", error)}
                    helperText={formatError("firstName", error)}
                    onChange={this.handleFirstNameChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Last Name"
                    value={lastName}
                    name="lastname"
                    error={hasError("lastName", error)}
                    helperText={formatError("lastName", error)}
                    onChange={this.handleLastNameChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Email"
                    required={true}
                    value={email}
                    name="email"
                    error={hasError("email", error)}
                    helperText={formatError("email", error)}
                    onChange={this.handleEmailChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="User Name"
                    required={true}
                    value={username}
                    name="username"
                    error={hasError("username", error)}
                    helperText={formatError("username", error)}
                    onChange={this.handleUsernameChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Password"
                    required={true}
                    type="password"
                    value={password}
                    name="password"
                    error={hasError("password", error)}
                    helperText={formatError("password", error)}
                    onChange={this.handlePasswordChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <Typography variant="overline">
                    By submitting this form I agree to the terms and conditions.
                  </Typography>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={loading}
                    variant="contained"
                    className={classes.paddedEnter}
                  >
                    Join
                  </Button>
                </form>
              </>)}
            </CardContent>
            {loading && <LinearProgress />}
          </Card>
        </Grid>
      </>
    );
  }

  private handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { requestJoin } = this.props;
    const { username, password, firstName, lastName, email } = this.state;

    requestJoin(username, password, email, true, firstName, lastName);
  };

  private handleChange = (
    name: "username" | "password" | "firstName" | "lastName" | "email",
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
  private handleFirstNameChange = this.handleChange("firstName");
  private handleLastNameChange = this.handleChange("lastName");
  private handleEmailChange = this.handleChange("email");
}

export default withStyles(joinStyles)(Join);
