import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
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
    }
  },
  palette: {
    primary: {
      main: "#407899",
    },
    secondary: {
      main: "#d64550",
    }
  }
});

export default theme;