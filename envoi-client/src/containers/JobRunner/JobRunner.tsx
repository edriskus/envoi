import React from "react";
import Info from "../../components/Info/Info";
import Runner from "../../components/Runner/Runner";

import { Typography, Grid, Card, CardContent } from "@material-ui/core";

const JobRunner: React.FunctionComponent = () => (
  <>
    <Grid item={true} xs={12} sm={6}>
      <Card>
        <CardContent>
          <Info />
        </CardContent>
      </Card>
    </Grid>
    <Grid item={true} xs={12} sm={6}>
      <Card>
        <CardContent>
          <Runner />
        </CardContent>
      </Card>
    </Grid>
  </>
)

export default JobRunner;