
import { useRouter } from "next/router";

import DefaultLayout from "@/layout/DefaultLayout";

import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/blogList.module.scss";

const List = (props) => {
    const {
        category = "",
        allFormatBlogs = []
    } = props;

    const router = useRouter();

    const getPath = (content) => {
        const titleRole = new RegExp("<h1>.+?</h1>");

        const path = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "").toLowerCase();

        return path
    }

    const handleClickArticle = (path) => {
        router.push(`${category}/${path}`)
    };

    return (
        <>
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

    const fs = require("fs");
    const hljs = require("highlight.js");

    const md = require("markdown-it")({
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

    const files = fs.readdirSync(`${process.cwd()}/contents/${category}`, "utf-8");

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