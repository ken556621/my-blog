import { useContext } from "react";
import capitalize from "lodash/capitalize";
import clsx from "clsx";

import Banner from "@/components/Banner";
import Header from "@/components/Header";

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";

import { categorySchema } from "@/constant/category";
import { baseUrl } from "@/constant/config";
import { DarkModeContext } from "@/context/darkModeContext";
import { getPath, getTitle, getAgenda } from "@/helper/getArticleTag";

const useBlogListStyles = makeStyles(theme => ({
  container: {
    margin: "30px auto 0px auto",
    padding: "0px 24px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    transition: "background-color 2s",
    maxWidth: 1200
  },
  headerWrapper: {
    position: "relative"
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
    width: 350,
    borderRadius: 8,
    cursor: "pointer",
    boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: "#c0c0c0"
    }
  },
  imgWrapper: {
    overflow: "hidden",
    height: 235,
    borderRadius: "8px 8px 0px 0px"
  },
  img: {
    width: "100%",
    transition: "all .5s ease",
    "&:hover": {
      transform: "scale(1.2)"
    }
  },
  wordWrapper: {
    padding: 20
  },
  cardTitle: {
    fontSize: "1rem"
  },
  cardDescription: {
    margin: 0,
    fontSize: ".725rem",
    "& p, ul": {
      margin: 0
    }
  }
}));

const BlogListContent = props => {
  const { category = "", allFormatBlogs = [] } = props;

  const classes = useBlogListStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  const BlogList = () => {
    return allFormatBlogs.map((blog, index) => (
      <Link href={`${category}/${getPath(blog)}`}>
        <a>
          <Paper
            classes={{
              root: clsx(classes.paperRoot, {
                [classes.darkMode]: isDarkMode
              })
            }}
            key={index}
            elevation={0}
          >
            <div className={classes.imgWrapper}>
              <img
                className={classes.img}
                src={`/article-img/${getPath(blog)}.jpg`}
                alt={getPath(blog)}
              />
            </div>
            <div className={classes.wordWrapper}>
              <p className={classes.cardTitle}>{getTitle(blog)}</p>
              <p
                className={classes.cardDescription}
                dangerouslySetInnerHTML={{ __html: getAgenda(blog) }}
              />
            </div>
          </Paper>
        </a>
      </Link>
    ));
  };

  return (
    <>
      <div className={classes.headerWrapper}>
        <Header
          title={capitalize(category) + " 技術文分享"}
          img={`${baseUrl}/avatar.jpg`}
        />
        <Banner title={capitalize(category) + " 技術文分享"} />
      </div>
      <div className={classes.container}>
        <BlogList />
      </div>
    </>
  );
};

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
        } catch (__) {}
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
    };
  }

  const allMdFiles = files.filter(fn => fn.endsWith(".md"));

  const allContent = allMdFiles.map(mdFile =>
    fs.readFileSync(`${process.cwd()}/contents/${category}/${mdFile}`, {
      encoding: "utf-8"
    })
  );

  const allFormatBlogs = allContent.map(content => md.render(content));

  return {
    props: {
      category: context.params.category,
      allFormatBlogs
    }
  };
};

export const getStaticPaths = async () => {
  const paths = categorySchema.map(fileName => {
    return {
      params: {
        category: fileName.title
      }
    };
  });

  return {
    paths,
    fallback: true
  };
};

export default BlogListContent;
