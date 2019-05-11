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
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { withRouter, RouteComponentProps } from "react-router";

type IJobListProps = RouteComponentProps;

class JobList extends React.PureComponent<IJobListProps> {
  render() {
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>
          Jobs
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4].map((row, i) => (
                <TableRow key={i} onClick={this.openJob(i)}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell align="right">{row}</TableCell>
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
        </Paper>
      </Grid>
    );
  }

  private openJob = (i: number) => () => {
    const { history } = this.props;
    history.push(`/jobs/${i}`);
  }

  private createJob = () => {
    const { history } = this.props;
    history.push(`/jobs/create`);
  }
}

export default withRouter(JobList);
