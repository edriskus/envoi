import { createStyles, Theme } from "@material-ui/core";

const fileReadStyles = (theme: Theme) => {
  return createStyles({
    mainWrapper: {
      margin: `${theme.spacing.unit}px 0`,
      width: "auto",
    },
    hiddenInput: {
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      marginRight: "calc(0px - 100vw)",
      marginBottom: "calc(0px - 100vh)",
      opacity: 0,
    },
    formLabel: {
      fontSize: 12,
      marginBottom: theme.spacing.unit / 2,
    },
    description: {
      marginTop: theme.spacing.unit / 2,
    },
  });
};

export default fileReadStyles;
