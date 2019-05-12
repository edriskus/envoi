import React from "react";

import {
  Fab,
  Grid,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { IApiError } from "../../types/api";
import { IJobSummary } from "../../types/job";
import { RouteComponentProps } from "react-router";

export interface IJobListStateProps {
  loading: boolean;
  error?: IApiError;
  list?: IJobSummary[];
}

export interface IJobListDispatchProps {
  requestListJob(): void;
}

type IJobListProps = 
  IJobListStateProps &
  IJobListDispatchProps &
  RouteComponentProps;

class JobList extends React.PureComponent<IJobListProps> {

  componentDidMount() {
    const { requestListJob } = this.props;
    requestListJob();
  }

  render() {
    const { list = [], loading } = this.props;
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>
          Jobs
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, i) => (
                <TableRow key={i} onClick={this.openJob(row._id)}>
                  <TableCell>{row.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Fab
            color="primary"
            aria-label="New Job"
            onClick={this.createJob}
          >
            <Add />
          </Fab>
          {loading && <LinearProgress />}
        </Paper>
      </Grid>
    );
  }

  private openJob = (id: string) => () => {
    const { history } = this.props;
    history.push(`/jobs/${id}`);
  }

  private createJob = () => {
    const { history } = this.props;
    history.push("/jobs/create");
  }
}

export default JobList;
