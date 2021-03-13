import { createContext } from "react"

export const drawer = {
    isOpened: true
};

export const DrawerContext = createContext(
    drawer.isOpened
);