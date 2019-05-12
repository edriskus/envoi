import { createStyles, Theme } from "@material-ui/core";

const fakeTextStyles = (theme: Theme) => {
  return createStyles({
    fullLine: {
      display: "inline-block",
      height: ".8em",
      width: "100%",
      background: theme.palette.grey[300],
    },
    partLine: {
      display: "inline-block",
      height: ".8em",
      width: "80%",
      background: theme.palette.grey[300],
    },
  });
};

export default fakeTextStyles;
