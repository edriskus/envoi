import React from "react";
import landingStyles from "./Landing.tss";

import { Typography, Grid, WithStyles, withStyles, Hidden } from "@material-ui/core";

import screenshot from "../../assets/screenshot.png";

type ILandingProps = WithStyles<typeof landingStyles>;

const Landing: React.FunctionComponent<ILandingProps> = 
  (props: ILandingProps) => {
    const { classes } = props;
    return (
      <Grid 
        xs={12} 
        item={true} 
        className={classes.fullWrapper}
      >
        <div className={classes.brandWrapper}>
          <Hidden xsDown={true}>
            <Typography variant="h1" align="center">Envoi.ts</Typography>
          </Hidden>
          <Hidden smUp={true}>
            <Typography variant="h2" align="center">Envoi.ts</Typography>
          </Hidden>
          <Typography variant="h5" align="center">
            /ahn-vwa/
          </Typography>
        </div>
        <Hidden xsDown={true}>
          <div className={classes.screenshotWrapper}>
            <img 
              src={screenshot} 
              className={classes.screenshot} 
            />
          </div>
        </Hidden>
      </Grid>
    );
  };

export default withStyles(landingStyles)(Landing);