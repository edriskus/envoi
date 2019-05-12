import React from "react";
import { Typography, Hidden, Grid, CardContent, Card, withStyles, WithStyles } from "@material-ui/core";
import { IAlgorithmSummary } from "../../types/algorithm";
import algorithmChooserStyles from "./AlgorithmChooser.tss";

export interface IAlgorithmChooserOwnProps {
  value?: string | null;
  onChange(value: string): void;
  list?: IAlgorithmSummary[] | null;
}

type IAlgorithmChooserStyleProps = WithStyles<typeof algorithmChooserStyles>;

export type IAlgorithmChooserProps = 
  IAlgorithmChooserOwnProps &
  IAlgorithmChooserStyleProps;

const AlgorithmChooser: React.FunctionComponent<IAlgorithmChooserProps> = props => {
  const { value, list, onChange, classes } = props;
  const hasList = Array.isArray(list);
  const handleClick = (algorithmId: string) => () => onChange(algorithmId);
  return (
    <>
      <Hidden xsDown={true}>
        <Typography variant="h2">Choose an algorithm</Typography>
      </Hidden>
      <Hidden smUp={true}>
        <Typography variant="h3">Choose an algorithm</Typography>
      </Hidden>
      <Grid container={true} className={classes.mainWrapper} spacing={8}>
        {!!list && hasList && list.map((algorithm, i) => (
          <Grid key={i} item={true} xs={12} sm={6} md={3}>
            <Card 
              className={classes.card}
              raised={value === algorithm._id}
              onClick={handleClick(algorithm._id)}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom={true}>
                  {algorithm.title}
                </Typography>
                <Typography>
                  {algorithm.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default withStyles(algorithmChooserStyles)(AlgorithmChooser);