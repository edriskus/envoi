import { createStyles, Theme } from "@material-ui/core";

const algorithmEditStyles = (theme: Theme) => {
  return createStyles({
    buttonWrapper: {
      display: "flex",
      paddingTop: theme.spacing.unit,
      justifyContent: "flex-end",
      "& > *": {
        marginLeft: theme.spacing.unit,
      },
    },
    fileReadWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    deleteButton: {
      marginRight: "auto",
      marginLeft: 0,
    }
  });
};

export default algorithmEditStyles;
