import React from 'react';
import appStyles from './App.tss';
import Landing from '../Landing/Landing';
import JobList from '../JobList/JobList';
import JobEdit from '../JobEdit/JobEdit';
import theme from '../../styles/theme.tss';
import JobRunner from '../JobRunner/JobRunner';
import Header from '../../components/Header/Header';
import AlgorithmList from '../AlgorithmList/AlgorithmList';

import { 
  Grid, 
  WithStyles, 
  withStyles, 
  CssBaseline, 
  MuiThemeProvider, 
} from '@material-ui/core';
import { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { configStore } from '../../state/store';

type IAppProps = WithStyles<typeof appStyles>;

const store = configStore();

class App extends Component<IAppProps> {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <Header />
            <div className={classes.mainWrapper}>
              <Grid 
                spacing={16}
                container={true} 
              >
                <Route path="/" exact={true} component={Landing}></Route>

                <Route path="/jobs" exact={true} component={JobList}></Route>
                <Route path="/jobs/:id" exact={true} component={JobRunner}></Route>
                <Route path="/jobs/:id/edit" exact={true} component={JobEdit}></Route>

                <Route path="/algorithms" exact={true} component={AlgorithmList}></Route>
              </Grid>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default withStyles(appStyles)(App);
