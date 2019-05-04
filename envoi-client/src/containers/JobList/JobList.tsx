import React from "react";

import { 
  Grid, 
  Paper, 
  Table, 
  TableRow, 
  TableBody, 
  TableCell, 
  TableHead, 
  Typography, 
} from "@material-ui/core";
import { withRouter, RouterProps } from "react-router";

type IJobListProps = RouterProps;

const JobList: React.FunctionComponent<RouterProps> = 
  (props: IJobListProps) => {
    const { history } = props;
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>Jobs</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1,2,3,4].map((row, i) => (
                <TableRow key={i} onClick={() => history.push(`/jobs/${i}`)}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell align="right">{row}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  };

export default withRouter(JobList);