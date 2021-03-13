import { useState } from "react";

import getConfig from "next/config";

import styles from "@/styles/global.scss"

import firebase from "firebase/app";
import "firebase/messaging";

import { ThemeContext, themes } from "@/context/themeContext";
import { DrawerContext, drawer } from "@/context/drawerContext";


const MyApp = ({ Component, pageProps, config }) => {
  const [backgroundColor, setBackgroundColor] = useState(themes.light);
  const [drawerOpened, setDrawerOpened] = useState(drawer.isOpened);

  return (
    <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <DrawerContext.Provider value={{ drawerOpened, setDrawerOpened }}>
        <Component {...pageProps} />
      </DrawerContext.Provider>
    </ThemeContext.Provider>
  )
}

MyApp.getInitialProps = async () => {
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
