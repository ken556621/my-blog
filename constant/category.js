import { v4 as uuid } from "uuid";


export const categorySchema = [
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
        title: "gcp",
        path: "/gcp"
    },
    {
        id: uuid(),
        title: "movie",
        path: "/movie"
    }
]