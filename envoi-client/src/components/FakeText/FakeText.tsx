import React from "react";
import fakeTextStyles from "./FakeText.tss";

import { withStyles, WithStyles } from "@material-ui/core";

export interface IFakeTextOwnProps {
  lines?: number;
  variant?: "paragraph" | "heading";
}

type IFakeTextStyleProps = WithStyles<typeof fakeTextStyles>;

export type IFakeTextProps = 
  IFakeTextOwnProps &
  IFakeTextStyleProps;

const FakeText: React.FunctionComponent<IFakeTextProps> = props => {
  const {
    lines = 1,
    variant = "paragraph",
    classes,
  } = props;
  const lineArray = [];
  if (variant === "heading") {
    lineArray.push(classes.partLine);
  }
  lineArray.push(...(new Array(lines - 1)).fill(classes.fullLine));
  if (variant === "paragraph") {
    lineArray.push(classes.partLine);
  }
  return (<>
    {lineArray.map((className, i) => (
      <span className={className} key={i} />
    ))}
  </>);
};

export default withStyles(fakeTextStyles)(FakeText);