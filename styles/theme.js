import { createMuiTheme } from '@material-ui/core/styles';

// 创建一个主题的实例。
const theme = createMuiTheme({
    color: {
        background: {
            main: "#f8fbff",
            darkMode: "#121212"
        },
        word: {
            main: "#0a2f5c",
            darkMode: "#f8fbff"
        },
    }
});

export default theme;