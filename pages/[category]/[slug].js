import Head from "next/head"

import SideList from "@/components/SideList";
import DefaultLayout from "@/layout/DefaultLayout";

import styles from "@/styles/blog.module.scss";


const Blog = (props) => {
    const {
      category = "",
      allFormatBlogs = [],
      blog = {}
    } = props;

    const getTitle = (content) => {
      const titleRole = new RegExp("<h1>.+?</h1>");

      const title = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "");

      return title
    }

    return (
      <div>
        <Head>
            <title>{getTitle(blog.content)}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <DefaultLayout />
        <SideList
          category={category}
          list={allFormatBlogs}
        />
        <div className={styles.container}>
          <section
            className={styles.articleSection}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    )
  }

  export async function getStaticProps(context) {
    const fs = require("fs");

    const { category, slug } = context.params;
    const path = `${process.cwd()}/contents/${category}/${slug}.md`;

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

    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    const files = fs.readdirSync(`${process.cwd()}/contents/${category}`, "utf-8");

    const allMdFiles = files.filter(fn => fn.endsWith(".md"));

    const allContent = allMdFiles.map(mdFile => fs.readFileSync(`${process.cwd()}/contents/${category}/${mdFile}`, {
        encoding: "utf-8",
    }));

    const allFormatBlogs = allContent.map(content => md.render(content));

    const result = md.render(rawContent);

    return {
      props: {
          category,
          allFormatBlogs,
          blog: {
            content: result
        }
      },
    };
  }

  export async function getStaticPaths() {
    const fs = require("fs");

    const folderPath = `${process.cwd()}/contents/`;
    const files = fs.readdirSync(folderPath, "utf-8");

    const result = files.map(folder => {
      const blogPath = `${process.cwd()}/contents/${folder}`;
      const blog = fs.readdirSync(blogPath, "utf-8");

      return {
        folder,
        blogs: blog
      }
    })

    const paths = [];

    result.forEach(file =>
      file.blogs.forEach(blog => {
        paths.push({
          params: {
            category: file.folder,
            slug: blog.replace(".md", "")
          }
        })
      })
    )

    return {
      paths,
      fallback: false,
    };
  }

  export default Blog

