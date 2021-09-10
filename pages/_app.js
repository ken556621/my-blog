import { useState, useEffect } from "react";

import styles from "@/styles/global.scss";

import { ThemeProvider } from "@material-ui/styles";

import theme from "@/styles/theme";

import { DarkModeContext } from "@/context/darkModeContext";
import { DrawerContext, drawer } from "@/context/drawerContext";

const MyApp = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(drawer.isOpened);

  useEffect(() => {
    const htmlDom = document.querySelector("html");

    htmlDom.style.transition = "background 2s";
    htmlDom.style.backgroundColor = isDarkMode ? "#121212" : "#f8fbff";
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <DrawerContext.Provider value={{ drawerOpened, setDrawerOpened }}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </DrawerContext.Provider>
    </DarkModeContext.Provider>
  );
};

export default MyApp;
