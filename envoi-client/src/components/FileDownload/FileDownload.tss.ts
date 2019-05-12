import { createStyles, Theme } from "@material-ui/core";

const fileDownloadStyles = (theme: Theme) => {
  return createStyles({
    mainWrapper: {
      margin: `${theme.spacing.unit}px 0`,
      width: "auto",
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

export default fileDownloadStyles;
