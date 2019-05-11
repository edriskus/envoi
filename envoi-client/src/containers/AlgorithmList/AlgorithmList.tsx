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

type IAlgorithmListProps = RouteComponentProps;

class AlgorithmList extends React.PureComponent<IAlgorithmListProps> {
 render() {
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
                <TableRow key={i} onClick={this.openAlgorithm(i)}>
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
            onClick={this.createAlgorithm}
          >
            <Add />
          </Fab>
        </Paper>
      </Grid>
    );
  }

  private openAlgorithm = (i: number) => () => {
    const { history } = this.props;
    history.push(`/algorithms/${i}/edit`);
  }

  private createAlgorithm = () => {
    const { history } = this.props;
    history.push("/algorithms/create");
  }
}

export default withRouter(AlgorithmList);
