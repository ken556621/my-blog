import { useState } from "react";

import getConfig from "next/config";

import styles from "@/styles/global.scss"

import firebase from "firebase/app";
import "firebase/messaging";

import { ThemeProvider } from "@material-ui/styles";

import theme from "@/styles/theme";

import { DarkModeContext } from "@/context/darkModeContext";
import { DrawerContext, drawer } from "@/context/drawerContext";


const MyApp = ({ Component, pageProps, config }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(drawer.isOpened);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <DrawerContext.Provider value={{ drawerOpened, setDrawerOpened }}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </DrawerContext.Provider>
    </DarkModeContext.Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const { serverRuntimeConfig } = getConfig();

  const {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_SENDER_ID,
    STORAGEBUCKET,
    AUTHDOMAIN,
    MEASUREMENTID
  } = serverRuntimeConfig;

  const firebaseConfig = {
    apiKey: `${FIREBASE_API_KEY}`,
    appId: `${FIREBASE_APP_ID}`,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${AUTHDOMAIN}`,
    messagingSenderId: FIREBASE_SENDER_ID,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${STORAGEBUCKET}`,
    measurementId: `${MEASUREMENTID}`
  };

  return {
    config: firebaseConfig
  }
}

export default MyApp
