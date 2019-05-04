import { createStyles, Theme } from "@material-ui/core";

const runnerStyles = (theme: Theme) => createStyles({
  progressWrapper: {
    padding: `${theme.spacing.unit}px 0`
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
  }
});

export default runnerStyles;