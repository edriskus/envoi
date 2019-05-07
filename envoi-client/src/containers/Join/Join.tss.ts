import { createStyles, Theme } from "@material-ui/core";

const joinStyles = (theme: Theme) => createStyles({
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paddedEnter: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px`,
  },
  registerFlex: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  registerButton: {
    margin: `0 ${theme.spacing.unit}px`,
  }
});

export default joinStyles;