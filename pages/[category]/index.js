
import { useRouter } from "next/router";
import Head from "next/head";

import DefaultLayout from "@/layout/DefaultLayout";

import Home from "@/components/Home";
import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/blogList.module.scss";

const List = (props) => {
    const {
        category = "",
        allFormatBlogs = [],
        isHomePage = false
    } = props;

    const router = useRouter();

    const getPath = (content) => {
        const titleRole = new RegExp("<h6>tags:.+?</h6>");

        const path = content.match(titleRole)[0].replace("<h6>tags:", "").replace("</h6>", "").toLowerCase();

        return path
    }

    const handleClickArticle = (path) => {
        router.push(`${category}/${path}`)
    };

    if(isHomePage){
        return (
            <>
                <Head>
                    <title>Ken Code</title>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                    <meta name="description" content="Ken Code blog" />
                    <meta name="keywords" content="engineer" />
                    <meta name="theme-color" content="#317EFB" />

                    <link rel="manifest" href="/manifest.json" />
                    <link href="/icons/favicon-16x16-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="16x16" />
                    <link href="/icons/favicon-32x32-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="32x32" />
                    <link href="/icons/apple-icon-60x60-dunplab-manifest-28429.png" rel="apple-touch-icon" type="image/png" sizes="60x60" />
                </Head>
                <DefaultLayout />
                <Home />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{"Ken Code " + category.toUpperCase()}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="description" content="Js, React and GCP blog" />
                <meta name="keywords" content="engineer" />
                <meta name="theme-color" content="#317EFB" />

                <link rel="manifest" href="/manifest.json" />
                <link href="/icons/favicon-16x16-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/favicon-32x32-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="32x32" />
                <link href="/icons/apple-icon-60x60-dunplab-manifest-28429.png" rel="apple-touch-icon" type="image/png" sizes="60x60" />
            </Head>
            <DefaultLayout />
            <SideList
                category={category}
                list={allFormatBlogs}
            />
            {
                allFormatBlogs.map((blog, index) => (
                    <div
                        key={index}
                        className={styles.container}
                    >
                        <div className={styles.overlay}>
                        </div>
                        <section
                            className={styles.articleSection}
                            onClick={() => handleClickArticle(getPath(blog))}
                            dangerouslySetInnerHTML={{ __html: blog }}
                        />
                    </div>
                ))
            }
        </>
    )
}


export async function getStaticProps(context) {
    const { category } = context.params;

    // 若是首頁則不繼續往下跑
    if(category === "home"){
        return {
            props: {
                category: "",
                allFormatBlogs: [],
                isHomePage: true
            }
        }
    }

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
    } catch (err) {
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

export async function getStaticPaths() {
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

export default List;