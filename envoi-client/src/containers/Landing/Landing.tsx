import React from "react";
import landingStyles from "./Landing.tss";

import { Typography, Grid, WithStyles, withStyles } from "@material-ui/core";

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
        <Typography variant="h1" align="center">Envoi.ts</Typography>
        <Typography variant="h5" align="center">
          /ahn-vwa/
        </Typography>
      </Grid>
    );
  }

export default withStyles(landingStyles)(Landing);