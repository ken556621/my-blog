

import { makeStyles } from "@material-ui/core/styles";



const useBlogStyles = makeStyles(theme => ({
  container: {

  }
}));

const Blog = (props) => {
    const {
      blog
    } = props;

    const classes = useBlogStyles();

    return (
      <div>
        <section
          className={classes.container}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    )
  }

  export async function getStaticProps(context) {
    const fs = require("fs");
    const remark = require("remark");
    const html = require("remark-html");

    const { category, slug } = context.params;
    const path = `${process.cwd()}/contents/${category}/${slug}.md`;


    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    const result = await remark()
    .use(html)
    .process(rawContent)

    return {
      props: {
          blog: {
            content: result.toString()
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

