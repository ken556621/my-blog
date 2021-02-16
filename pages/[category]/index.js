
import { useRouter } from "next/router";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/blogList.module.scss";

const BlogList = (props) => {
    const {
        category = "",
        allFormatBlogs = []
    } = props;

    const router = useRouter();

    const getPath = content => {
        const titleRole = new RegExp("<p>tags:.+?</p>");

        const path = content.match(titleRole)[0].replace("<p>tags:", "").replace("</p>", "").toLowerCase();

        return path
    }

    const handleClickArticle = (path) => {
        router.push(`${category}/${path}`)
    };

    const BlogList = () => {
        return (
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
        )
    }

    return (
        <>
            <Header
                title = {`${category.toUpperCase()} | 游肯扣部落格`}
                description = {`${category} 的技術部落格文章列表`}
                sharingTitle = {`${category} 的技術部落格文章列表`}
            />
            <Banner
                word = {`${category.toUpperCase()} 系列文章`}
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

export default BlogList;