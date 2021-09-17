import { v4 as uuid } from "uuid";

export const categorySchema = [
  {
    id: uuid(),
    title: "about",
    path: "/"
  },
  {
    id: uuid(),
    title: "js",
    path: "/js"
  },
  {
    id: uuid(),
    title: "react",
    path: "/react"
  },
  {
    id: uuid(),
    title: "portfolio",
    path: "/?portfolio=true"
  }
];
