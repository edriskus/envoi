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

interface IJoinState {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IJoinStateProps {
  loggedIn: boolean;
  loading: boolean;
  error?: IApiError;
}

export interface IJoinDispatchProps {
  requestJoin(
    username: string,
    password: string,
    firstName: string,
    email: string,
    lastName: string,
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

  render() {
    const { loading, error, classes } = this.props;
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
              <form className={classes.flex} onSubmit={this.handleSubmit}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required={true}
                  label="First Name"
                  value={firstName}
                  name="firstname"
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
                  onChange={this.handlePasswordChange}
                  margin="normal"
                  variant="outlined"
                />
                <Typography variant="overline">
                  By submitting this form I agree to the TOC
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

    requestJoin(username, password, firstName, lastName, email);
  };

  private handleChange = (
    name: "username" | "password" | "firstName" | "lastName" | "email",
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      [name]: value,
    } as any);
  };

  private handleUsernameChange = this.handleChange("username");
  private handlePasswordChange = this.handleChange("password");
  private handleFirstNameChange = this.handleChange("firstName");
  private handleLastNameChange = this.handleChange("lastName");
  private handleEmailChange = this.handleChange("email");
}

export default withStyles(joinStyles)(Join);
