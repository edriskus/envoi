import { createStyles, Theme } from "@material-ui/core";

const algorithmChooserStyles = (theme: Theme) => {
  return createStyles({
    card: {
      cursor: "pointer",
      flexGrow: 1,
      height: "100%",
    },
    mainWrapper: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit,
    },
    description: {
      maxHeight: 200,
      overflow: "auto",
    },
  });
};

export default algorithmChooserStyles;
