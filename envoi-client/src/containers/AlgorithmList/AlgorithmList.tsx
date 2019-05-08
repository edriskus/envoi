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
  Typography
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { withRouter, RouterProps } from "react-router";

type IAlgorithmListProps = RouterProps;

const AlgorithmList: React.FunctionComponent<IAlgorithmListProps> = props => {
  const { history } = props;
  return (
    <Grid item={true} xs={12}>
      <Typography variant="h3" gutterBottom={true}>
        Algorithms
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
              <TableRow key={i} onClick={() => history.push(`/algorithms/${i}`)}>
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
          aria-label="New Algorithm"
          onClick={() => history.push("/algorithms/create")}
        >
          <Add />
        </Fab>
      </Paper>
    </Grid>
  );
};

export default withRouter(AlgorithmList);
