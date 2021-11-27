import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  color: {
    background: {
      main: "#f8fbff",
      darkMode: "#2f2f2f"
    },
    word: {
      main: "#0a2f5c",
      darkMode: "#ffffff"
    },
    secondWord: {
      main: "#0a2f5c",
      darkMode: "#ffffff"
    },
    codeBlock: {
      main: "#0a2f5c",
      darkMode: "rgb(189, 193, 198)"
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
