import React from "react";
import Runner from "../Runner/Runner";

import { RouteComponentProps, withRouter } from "react-router";
import { withStyles, WithStyles, Card, CardContent, Typography } from "@material-ui/core";
import embedStyles from "./Embed.tss";
import { BubbleChart } from "@material-ui/icons";

type IEmbedStyleProps = WithStyles<typeof embedStyles>;

type IEmbedProps = 
  IEmbedStyleProps &
  RouteComponentProps<{ id: string }>;

export class Embed extends React.PureComponent<IEmbedProps> {
  render() {
    const { match, classes } = this.props;
    const { params } = match;
    return (
      <div className={classes.mainWrapper}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Runner 
              gpu={false}
              finished={false}
              jobId={params.id}
              autoStart={true}
            />
            <a 
              className={classes.logoWrapper}
              href="https://envoi.riskus.lt" 
              target="_blank"
            >
              <Typography variant="caption">
                You're now taking part in science
              </Typography>
              <Typography
                variant="caption" 
                color="inherit"
              >
                <BubbleChart color="secondary" />
                <span>Envoi.ts</span>
              </Typography>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(embedStyles)(withRouter(Embed));