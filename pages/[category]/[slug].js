import {
  getDate,
  getPath,
  getSecondTitle,
  getTitle,
  getWordCount
} from "@/helper/getArticleTag";

import Banner from "@/components/Banner";
import { DarkModeContext } from "@/context/darkModeContext";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { baseUrl } from "@/constant/config";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { setSecondTitleId } from "@/helper/formatArticle";
import { useContext } from "react";

const useBlogStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#efefef",
    transition: "background-color 2s"
  },
  articleContainer: {
    width: "85%",
    margin: "0px auto",
    padding: "20px 60px 50px",
    transition: "background-color 2s",
    boxShadow: "0 2px 6px rgb(0 0 0 / 25%)",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    [theme.breakpoints.up("laptop")]: {
      width: "65%"
    }
  },
  headerWrapper: {
    position: "relative"
  },
  darkMode: {
    "& section > h1, h2, h3": {
      color: theme.color.word.darkMode
    },
    "& section > span, li, h4, h5, p, th, td": {
      color: theme.color.secondWord.darkMode
    }
  },
  backgroundDarkMode: {
    backgroundColor: theme.color.background.darkMode
  },
  articleSection: {
    width: "100%"
  }
}));

const Blog = props => {
  const { blog = {} } = props;

  const classes = useBlogStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  const formatedContent = setSecondTitleId(blog.content);

  const title = getTitle(blog.content);

  return (
    <main
      className={clsx(classes.container, {
        [classes.backgroundDarkMode]: isDarkMode
      })}
    >
      <div className={classes.headerWrapper}>
        <Header
          title={title}
          description={title}
          sharingTitle={title}
          img={`${baseUrl}/article-img/${getPath(blog.content)}.jpg`}
        />
        <Banner
          title={title}
          date={getDate(blog.content)}
          wordCount={getWordCount(blog.content)}
        />
      </div>
      <SideNav secondTitleList={getSecondTitle(blog.content)} />
      <article
        className={clsx(classes.articleContainer, {
          [classes.darkMode]: isDarkMode,
          [classes.backgroundDarkMode]: isDarkMode
        })}
      >
        <section
          className={classes.articleSection}
          dangerouslySetInnerHTML={{ __html: formatedContent }}
        />
      </article>
    </main>
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
