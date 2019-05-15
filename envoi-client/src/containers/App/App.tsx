import React from "react";
import appStyles from "./App.tss";
import theme from "../../styles/theme.tss";
import ConnectedRoutes from "../Routes/ConnectedRoutes";
import ConnectedHeader from "../Header/ConnectedHeader";

import { 
  Grid, 
  WithStyles, 
  withStyles, 
  CssBaseline, 
  MuiThemeProvider, 
} from "@material-ui/core";
import { Component } from "react";
import { Provider } from "react-redux";
import { configStore } from "../../state/store";
import { BrowserRouter as Router } from "react-router-dom";
import { loadPersistedState } from "../../helpers/localStorage";

type IAppProps = WithStyles<typeof appStyles>;

const store = configStore(loadPersistedState());

class App extends Component<IAppProps> {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <ConnectedHeader />
            <div className={classes.mainWrapper}>
              <Grid 
                spacing={16}
                container={true} 
              >
                <ConnectedRoutes />
              </Grid>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(appStyles)(App);
