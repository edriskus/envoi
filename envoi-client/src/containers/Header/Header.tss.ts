import { createStyles, Theme } from "@material-ui/core";

const headerStyles = (theme: Theme) => createStyles({
  buttonsWrapper: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
  },
  linkActive: {
    "& > button::before": {
      content: `""`,
      display: "block",
      backgroundColor: theme.palette.common.white,
      width: 4,
      height: 4,
      borderRadius: "50%",
      position: "absolute",
      bottom: 4,
      left: `calc(50% - 2px)`,
    },
  },
  chip: {
    backgroundColor: theme.palette.common.white,
    marginLeft: theme.spacing.unit,
    cursor: "pointer",
  },
});

export default headerStyles;