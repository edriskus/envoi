import { createStyles, Theme } from "@material-ui/core";

const appStyles = (theme: Theme) => createStyles({
  mainWrapper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  },
});

export default appStyles;