import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  color: {
    background: {
      main: "#f8fbff",
      darkMode: "#121212"
    },
    word: {
      main: "#0a2f5c",
      darkMode: "#f8fbff"
    }
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: "capitalize"
      }
    }
  }
});

export default theme;
