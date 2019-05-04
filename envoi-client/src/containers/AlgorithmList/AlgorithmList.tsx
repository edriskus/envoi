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

const AlgorithmList: React.FunctionComponent = () => (
  <Grid item={true} xs={12}>
    <Typography variant="h3" gutterBottom={true}>Algorithms</Typography>
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
            <TableRow key={i}>
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
)

export default AlgorithmList;