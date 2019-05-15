import React from "react";

import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import { IUserData } from "../../types/user";

export interface ISettingsDispatchProps {
  getCredits(): void;
}

export type ISettingsProps = IUserData & ISettingsDispatchProps;

class Settings extends React.PureComponent<ISettingsProps> {
  componentDidMount() {
    const { getCredits } = this.props;
    getCredits();
  }
  render() {
    const { credits } = this.props;
    let formattedCredits: string;
    if (credits != null) {
      formattedCredits = "" + (Math.floor(credits * 100) / 100);
    } else {
      formattedCredits = "-";
    }
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>
          My Account
        </Typography>
        <Card>
          <CardContent>
            <Typography gutterBottom={true}>
              <b>Credits:&nbsp;</b>
              {formattedCredits}
            </Typography>
            <Button 
              variant="contained"
              color="primary"
              disabled={true}
            >
              Get more (coming soon!)
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
} 

export default Settings;
