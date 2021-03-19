import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import { makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

import { DarkModeContext } from "@/context/darkModeContext";

import { getPath, getTitle, getAgenda } from "@/helper/getArticleTag";


const BlogList = (props) => {
    const {
        category = "",
        allFormatBlogs = []
    } = props;

    const classes = useBlogListStyles();

    const router = useRouter();

    const { isDarkMode } = useContext(DarkModeContext);

    const askForNotificationPermission = () => {
        Notification.requestPermission(result => {
            // 這裡result只會有兩種結果：一個是用戶允許(granted)，另一個是用戶封鎖(denied)
            console.log("User Choice", result);
            if (result !== "granted") {
                console.log("拒絕");
            } else {
                console.log("接受");
            }
        });
    };

    const handleClickArticle = (path) => {
        router.push(`${category}/${path}`)
    };

    const BlogList = () => {
        return (
            allFormatBlogs.map((blog, index) => (
                <Paper
                    classes={{
                        root: clsx(classes.paperRoot, {
                            [classes.darkMode]: isDarkMode
                        })
                    }}
                    key={index}
                    elevation={0}
                    onClick={() => handleClickArticle(getPath(blog))}
                >
                    <div className={classes.imgWrapper}>
                        <img
                            className={classes.img}
                            src={`/article-img/${getPath(blog)}.jpg`}
                        />
                    </div>
                    <div className={classes.wordWrapper}>
                        <p
                            className={classes.cardTitle}
                        >
                            {getTitle(blog)}
                        </p>
                        <p
                            className={classes.cardDescription}
                            dangerouslySetInnerHTML={{ __html: getAgenda(blog) }}
                        />
                    </div>
                </Paper>
            ))
        )
    }

    useEffect(() => {
        askForNotificationPermission();
    }, [])

    return (
        <>
            <Header
                title={`${category.toUpperCase()} | 游肯扣部落格`}
                description={`${category} 的技術部落格文章列表`}
                sharingTitle={`${category} 的技術部落格文章列表`}
            />
            <Banner
                word={`${category.toUpperCase()} 系列文章`}
            />
            <SideList
                category={category}
                list={allFormatBlogs}
            />
            <div className={classes.container}>
                <BlogList />
            </div>
        </>
    )
}


export const getStaticProps = async context => {
    const { category } = context.params;

    const fs = require("fs");
    const hljs = require("highlight.js");

    const md = require("markdown-it")({
        html: true,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {

                }
            }

            return "";
        }
    });

    // 擋若不是文章列表內的網址列畫面不會噴錯
    let files;

    try {
        files = fs.readdirSync(`${process.cwd()}/contents/${category}`, "utf-8");
    }
    catch (err) {
        return {
            props: {
                category: "",
                allFormatBlogs: []
            }
        }
    }

    const allMdFiles = files.filter(fn => fn.endsWith(".md"));

    const allContent = allMdFiles.map(mdFile => fs.readFileSync(`${process.cwd()}/contents/${category}/${mdFile}`, {
        encoding: "utf-8",
    }))

    const allFormatBlogs = allContent.map(content => md.render(content));

    return {
        props: {
            category: context.params.category,
            allFormatBlogs
        }
    };
}

export const getStaticPaths = async () => {
    const paths = categorySchema.map(fileName => {
        return {
            params: {
                category: fileName.title
            }
        }
    })

    return {
        paths,
        fallback: true
    };
}

const useBlogListStyles = makeStyles((theme) => ({
    container: {
        marginTop: 30,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        transition: "all 2s"
    },
    darkMode: {
        boxShadow: "0 2px 10px 0 rgba(255, 255, 255, 0.1)"
    },
    articleSection: {
        cursor: "pointer",
        width: "100%"
    },
    paperRoot: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 30,
        width: 300,
        borderRadius: 8,
        cursor: "pointer",
        boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
        "&:hover": {
            backgroundColor: "#c0c0c0"
        }
    },
    imgWrapper: {
        overflow: "hidden",
        borderRadius: "8px 8px 0px 0px"
    },
    img: {
        width: 300,
        transition: "all .5s ease",
        "&:hover": {
            transform: "scale(1.2)"
        }
    },
    wordWrapper: {
        paddingBottom: 20,
        paddingLeft: 20
    },
    cardTitle: {
        fontSize: 20
    },
    cardDescription: {
        margin: 0,
        "& p, ul": {
            margin: 0
        }
    }
}));

export default BlogList;