
import Header from "@/components/Header";
import SideList from "@/components/SideList";
import Banner from "@/components/Banner";

import styles from "@/styles/blog.module.scss";


const Blog = props => {
    const {
      category = "",
      allFormatBlogs = [],
      blog = {}
    } = props;

    const getTitle = content => {
      const titleRole = new RegExp("<h1>.+?</h1>");

      if(!titleRole){
          return ""
      }

      const title = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "");

      return title
    }

    const getDate = content => {
      const dateRole = new RegExp("<p>date:.+?</p>");

      if(!dateRole){
          return ""
      }

      const date = content.match(dateRole)[0].replace("<p>date:", "").replace("</p>", "");

      return date
    }

    return (
      <div>
        <Header
            title = {`${getTitle(blog.content)} | 游肯扣部落格`}
            description = {`肯游扣部落格關於${getTitle(blog.content)}的介紹`}
            sharingTitle = {`肯游扣部落格關於${getTitle(blog.content)}的介紹`}
        />
        <Banner
            word = {`${getTitle(blog.content)}`}
            date = {getDate(blog.content)}
        />
        <SideList
          category={category}
          list={allFormatBlogs}
        />
        <article className={styles.container}>
          <section
            className={styles.articleSection}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    )
  }

  export const getStaticProps = async context => {
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

  export const getStaticPaths = async () => {
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

