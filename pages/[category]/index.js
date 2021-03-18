import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import { makeStyles } from "@material-ui/core";

import { DarkModeContext } from "@/context/darkModeContext";


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

    const getPath = content => {
        const titleRole = new RegExp("<p>tags:.+?</p>");

        if (!titleRole) {
            return ""
        }

        const path = content.match(titleRole)[0].replace("<p>tags:", "").replace("</p>", "").toLowerCase();

        return path
    }

    const handleClickArticle = (path) => {
        router.push(`${category}/${path}`)
    };

    const BlogList = () => {
        return (
            allFormatBlogs.map((blog, index) => (
                <article
                    key={index}
                    className={clsx(classes.container, {
                        [classes.darkMode]: isDarkMode
                    })}
                >
                    <section
                        className={classes.articleSection}
                        onClick={() => handleClickArticle(getPath(blog))}
                        dangerouslySetInnerHTML={{ __html: blog }}
                    />
                </article>
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
            <BlogList />
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
        paddingLeft: "30px",
        height: 500,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        transition: "all 2s"
    },
    darkMode: {
        "& span, h1, h2, h3, h4, h5, li, p, th, td, code": {
            color: theme.color.word.darkMode
        },
        "& pre": {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        },
        backgroundColor: theme.color.background.darkMode
    },
    articleSection: {
        cursor: "pointer",
        width: "100%"
    }
}));

export default BlogList;