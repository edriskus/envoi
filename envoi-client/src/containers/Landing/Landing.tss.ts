import { createStyles, Theme } from "@material-ui/core";

const landingStyles = (theme: Theme) => createStyles({
  fullWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: `calc(100vh - 80px)`,
  },
  brandWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  screenshotWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenshot: {
    width: "70vw",
    marginBottom: "-16px",
  }
});

export default landingStyles;