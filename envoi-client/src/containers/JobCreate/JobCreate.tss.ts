import { createStyles, Theme } from "@material-ui/core";

const jobCreateStyles = (theme: Theme) => {
  const wrapperStyle = {
    width: "100%",
    display: "flex",
    paddingTop: theme.spacing.unit * 2,
  };
  return createStyles({
    buttonWrapper: {
      ...wrapperStyle,
      justifyContent: "space-between",
    },
    buttonRightWrapper: {
      ...wrapperStyle,
      justifyContent: "flex-end",
    }
  });
}

export default jobCreateStyles;