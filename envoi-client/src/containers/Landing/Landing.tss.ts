import { createStyles, Theme } from "@material-ui/core";

const landingStyles = (theme: Theme) => createStyles({
  fullWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: `calc(100vh - 150px)`,
  },
});

export default landingStyles;