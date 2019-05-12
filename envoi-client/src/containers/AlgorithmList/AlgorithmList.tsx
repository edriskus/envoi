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
  Hidden,
} from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import { IApiError } from "../../types/api";
import { RouteComponentProps } from "react-router";
import { IAlgorithmSummary } from "../../types/algorithm";
import FileInfo from "../../components/FileInfo/FileInfo";

export interface IAlgorithmListStateProps {
  loading: boolean;
  error?: IApiError;
  list?: IAlgorithmSummary[];
}

export interface IAlgorithmListDispatchProps {
  requestListAlgorithm(): void;
}

type IAlgorithmListProps = 
  IAlgorithmListStateProps &
  IAlgorithmListDispatchProps &
  RouteComponentProps;

class AlgorithmList extends React.PureComponent<IAlgorithmListProps> {

  componentDidMount() {
    const { requestListAlgorithm } = this.props;
    requestListAlgorithm();
  }

  render() {
    const { list = [], loading } = this.props;
    return (
      <Grid item={true} xs={12}>
        <Typography variant="h3" gutterBottom={true}>
          Algorithms
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Uses GPU</TableCell>
                <Hidden smDown={true}>
                  <TableCell>Dispatcher</TableCell>
                </Hidden>
                <Hidden xsDown={true}>
                  <TableCell>Runner</TableCell>
                </Hidden>
                <Hidden smDown={true}>
                  <TableCell>Reducer</TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row, i) => (
                <TableRow key={i} onClick={this.openAlgorithm(row._id)}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.gpu && (
                    <Done />
                  )}</TableCell>
                  <Hidden smDown={true}>
                    <TableCell>
                      <FileInfo filePointer={row.dispatcher} />
                    </TableCell>
                  </Hidden>
                  <Hidden xsDown={true}>
                    <TableCell>
                      <FileInfo filePointer={row.runner} />
                    </TableCell>
                  </Hidden>
                  <Hidden smDown={true}>
                    <TableCell>
                      <FileInfo filePointer={row.reducer} />
                    </TableCell>
                  </Hidden>
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
          {loading && <LinearProgress />}
        </Paper>
      </Grid>
    );
  }

  private openAlgorithm = (id: string) => () => {
    const { history } = this.props;
    history.push(`/algorithms/${id}/edit`);
  }

  private createAlgorithm = () => {
    const { history } = this.props;
    history.push("/algorithms/create");
  }
}

export default AlgorithmList;
