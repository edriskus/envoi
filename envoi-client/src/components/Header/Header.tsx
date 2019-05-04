import React from "react";
import headerStyles from "./Header.tss";

import { Link, NavLink } from "react-router-dom";
import { BubbleChart, HdrStrong } from "@material-ui/icons";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  WithStyles, 
  withStyles,
  Chip, 
} from "@material-ui/core";

type IHeaderProps = WithStyles<typeof headerStyles>;

const Header: React.FunctionComponent<IHeaderProps> = 
  (props: IHeaderProps) => {
    const { classes } = props;
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
          <div className={classes.buttonsWrapper}>
            <NavLink to="/jobs" activeClassName={classes.linkActive}>
              <Button color="inherit">Jobs</Button>
            </NavLink>
            <NavLink to="/algorithms" activeClassName={classes.linkActive}>
              <Button color="inherit">Algorithms</Button>
            </NavLink>
            <Chip
              label={(<>
                <HdrStrong />
                <b>&nbsp;{27}</b>
              </>)}
              className={classes.chip}
              color="default" 
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  };

export default withStyles(headerStyles)(Header);