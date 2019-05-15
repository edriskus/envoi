import React from "react";
import emptyRowStyles from "./EmptyRow.tss";

import { Typography, TableRow, withStyles, WithStyles } from "@material-ui/core";

export interface IEmptyRowOwnProps {
  name: string;
  loading: boolean;
  list?: any[] | null;
}

type IEmptyRowStyleProps = WithStyles<typeof emptyRowStyles>;

type IEmptyRowProps =
  IEmptyRowStyleProps &
  IEmptyRowOwnProps;

const EmptyRow: React.FunctionComponent<IEmptyRowProps> = props => {
  const { name, loading, list, classes } = props;  
  const isEmpty = !list || !Array.isArray(list) || (list.length < 1);
  if (!isEmpty) {
    return null;
  }
  return (
    <Typography 
      align="center"
      variant="subtitle1"
      className={classes.text}
    >
      {loading ? (
        `Loading ${name}...`
      ) : (
        `You have no ${name}. Create some by clicking \"+\"`
      )}
    </Typography>
  );
};

export default withStyles(emptyRowStyles)(EmptyRow);