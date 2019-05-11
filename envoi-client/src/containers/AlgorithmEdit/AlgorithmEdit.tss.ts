import { createStyles, Theme } from "@material-ui/core";

const algorithmEditStyles = (theme: Theme) => {
  return createStyles({
    buttonWrapper: {
      display: "flex",
      paddingTop: theme.spacing.unit,
      justifyContent: "flex-end",
    },
    fileReadWrapper: {
      display: "flex",
      flexDirection: "column",
    },
  });
};

export default algorithmEditStyles;
