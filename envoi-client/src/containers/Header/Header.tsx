import React from "react";
import headerStyles from "./Header.tss";

import { 
  Menu,
  Chip, 
  AppBar, 
  Button, 
  Toolbar, 
  MenuItem, 
  withStyles,
  WithStyles,
  Typography, 
} from "@material-ui/core";
import { IUserData } from "../../types/user";
import { Link, NavLink } from "react-router-dom";
import { BubbleChart, HdrStrong } from "@material-ui/icons";
import { isCreator } from "../../helpers/user";

type IHeaderStypeProps = WithStyles<typeof headerStyles>;

export interface IHeaderDispatchProps {
  logOut(): void;
  getCredits(): void;
}

type IHeaderProps =
  IUserData &
  IHeaderDispatchProps &
  IHeaderStypeProps;

interface IHeaderState {
  menuAnchor: HTMLElement | null;
}

class Header extends React.PureComponent<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuAnchor: null,
  };

  componentDidMount() {
    const { loggedIn, getCredits } = this.props;
    if (loggedIn) {
      getCredits();
    }
  }

  render() {
    const { 
      classes, 
      loggedIn, 
      credits,
      user: { type } = {} as any,
    } = this.props;
    const { menuAnchor } = this.state;
    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Link to="/">
            <Typography 
              variant="h6" 
              color="inherit"
              className={classes.logoWrapper}
            >
              <BubbleChart />
            </Typography>
          </Link>
          {loggedIn && <div className={classes.buttonsWrapper}>
            <NavLink to="/jobs" activeClassName={classes.linkActive}>
              <Button color="inherit">Jobs</Button>
            </NavLink>
            {isCreator(type) && <NavLink to="/algorithms" activeClassName={classes.linkActive}>
              <Button color="inherit">Algorithms</Button>
            </NavLink>}
            <Chip
              label={(<>
                <HdrStrong />
                <b>&nbsp;{credits == null ? 
                  "-" : 
                  Math.floor(credits as any)
                }</b>
              </>)}
              className={classes.chip}
              onClick={this.openMenu}
              color="default" 
            />
            <Menu
              id="simple-menu"
              anchorEl={menuAnchor}
              open={!!menuAnchor}
              onClose={this.closeMenu}
            >
              <MenuItem onClick={this.closeMenu}>
                <Link to="/settings">My account</Link>
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
          </div>}
          {!loggedIn && <div className={classes.buttonsWrapper}>
            <NavLink to="/login" activeClassName={classes.linkActive}>
              <Button color="inherit">Log In</Button>
            </NavLink>
            <NavLink to="/join" activeClassName={classes.linkActive}>
              <Button color="inherit">Join</Button>
            </NavLink>
          </div>}
        </Toolbar>
      </AppBar>
    );
  }

  openMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ menuAnchor: null });
  };

  handleLogout = () => {
    const { logOut } = this.props;
    this.closeMenu();
    logOut();
  }
}

export default withStyles(headerStyles)(Header);