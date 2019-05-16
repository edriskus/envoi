import { createStyles, Theme } from "@material-ui/core";

const embedStyles = (theme: Theme) => createStyles({
  mainWrapper: {
    padding: theme.spacing.unit,
    maxWidth: 500,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: theme.spacing.unit,
    },
  },
});

export default embedStyles;