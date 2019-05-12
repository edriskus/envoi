import React from "react";
import Info from "../../components/Info/Info";
import Runner from "../../components/Runner/Runner";

import { Typography, Grid, Card, CardContent, LinearProgress } from "@material-ui/core";
import { IJob } from "../../types/job";
import { IApiError } from "../../types/api";
import { RouteComponentProps } from "react-router";

export interface IJobViewStateProps {
  job?: IJob;
  error?: IApiError;
  loading: boolean;
}

export interface IJobViewDispatchProps {
  requestGetJob(id: string): void;
  requestDeleteJob(id: string): void;
}

export type IJobViewProps = 
  RouteComponentProps<{ id: string }> &
  IJobViewStateProps &
  IJobViewDispatchProps;

class JobView extends React.PureComponent<IJobViewProps> {
  componentDidMount() {
    const { match, requestGetJob } = this.props;
    const { params } = match;
    if (params.id) {
      requestGetJob(params.id);
    }
  }

  render() {
    const { loading, job } = this.props;
    return (
      <>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Info entity={job} />
            </CardContent>
            {loading && <LinearProgress />}
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
    );
  }
}

export default JobView;