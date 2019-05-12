import React from "react";
import Info from "../../components/Info/Info";
import Runner from "../../components/Runner/Runner";
import DelayButton from "../../components/DelayButton/DelayButton";
import NotFoundHandler from "../../components/NotFoundHandler/NotFoundHandler";

import { IJob } from "../../types/job";
import { IApiError } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { Grid, Card, CardContent, LinearProgress } from "@material-ui/core";

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

  componentDidUpdate(prevProps: IJobViewProps) {
    const { job, history, loading, error } = this.props;
    if (prevProps.loading && !loading) {
      if (!job && !error) {
        history.goBack();
      }
    }
  }

  render() {
    const { loading, job, error } = this.props;
    return (
      <>
        <NotFoundHandler to="/jobs" error={error} />
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
              <DelayButton
                onClick={this.handleDelete}
                triggeredLabel="Confirm"
                color="secondary"
              >
                Delete
              </DelayButton>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }

  private handleDelete = () => {
    const { requestDeleteJob, job } = this.props;
    if (job &&  job._id) {
      requestDeleteJob(job._id);
    }
  }
}

export default JobView;