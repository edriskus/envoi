import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: `"Open Sans", sans-serif`,
    h1: {
      fontFamily: `"Playfair Display", serif`,
    },
    h2: {
      fontFamily: `"Playfair Display", serif`,
    },
    h3: {
      fontFamily: `"Playfair Display", serif`,
      fontWeight: 900,
    },
    h6: {
      fontFamily: `"Playfair Display", serif`,
    },
  },
  palette: {
    primary: {
      main: "#407899",
    },
    secondary: {
      main: "#d64550",
    },
  },
  overrides: {
    MuiFab: {
      root: {
        position: "fixed",
        bottom: 16,
        right: 16,
      },
    },
    MuiFormControl: {
      root: {
        width: 240,
        maxWidth: "100%",
      },
    },
  },
});

export default theme;
