import { useContext } from "react";
import clsx from "clsx";

import SideList from "@/components/SideList";
import Banner from "@/components/Banner";

import { makeStyles } from "@material-ui/core";

import { DarkModeContext } from "@/context/darkModeContext";

import { getTitle, getDate } from "@/helper/getArticleTag";

const useBlogStyles = makeStyles(theme => ({
  container: {
    width: "75%",
    margin: "0px auto",
    transition: "background-color 2s"
  },
  darkMode: {
    "& section > span, h1, h2, h3, h4, h5, li, p, th, td": {
      color: theme.color.word.darkMode
    },
    "& blockquote > p": {
      color: "rgba(117, 117, 117, 1)"
    }
  },
  articleSection: {
    width: "100%"
  }
}));

const Blog = props => {
  const { category = "", allFormatBlogs = [], blog = {} } = props;

  const classes = useBlogStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      <Banner word={`${getTitle(blog.content)}`} date={getDate(blog.content)} />
      <SideList category={category} list={allFormatBlogs} />
      <article
        className={clsx(classes.container, {
          [classes.darkMode]: isDarkMode
        })}
      >
        <section
          className={classes.articleSection}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
};

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
        } catch (__) {}
      }

      return "";
    }
  });

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8"
  });

  const files = fs.readdirSync(
    `${process.cwd()}/contents/${category}`,
    "utf-8"
  );

  const allMdFiles = files.filter(fn => fn.endsWith(".md"));

  const allContent = allMdFiles.map(mdFile =>
    fs.readFileSync(`${process.cwd()}/contents/${category}/${mdFile}`, {
      encoding: "utf-8"
    })
  );

  const allFormatBlogs = allContent.map(content => md.render(content));

  const result = md.render(rawContent);

  return {
    props: {
      category,
      allFormatBlogs,
      blog: {
        content: result
      }
    }
  };
};

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
    };
  });

  const paths = [];

  result.forEach(file =>
    file.blogs.forEach(blog => {
      paths.push({
        params: {
          category: file.folder,
          slug: blog.replace(".md", "")
        }
      });
    })
  );

  return {
    paths,
    fallback: false
  };
};

export default Blog;
