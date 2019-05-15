import { createStyles, Theme } from "@material-ui/core";

const emptyRowStyles = (theme: Theme) => {
  return createStyles({
    text: {
      marginTop: theme.spacing.unit,
      color: theme.palette.grey[700],
      paddingBottom: theme.spacing.unit,
    },
  });
};

export default emptyRowStyles;
