import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  color: {
    background: {
      main: "#f8fbff",
      darkMode: "#121c2e"
    },
    word: {
      main: "#0a2f5c",
      darkMode: "#fff"
    }
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "capitalize"
      }
    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200
    }
  }
});

export default theme;
