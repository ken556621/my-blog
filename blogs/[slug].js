

const Blog = (props) => {
  const {
    blog
  } = props;

  return (
    <div>
      <h1>{blog.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: blog.content }}></section>
    </div>
  )
}

export async function getStaticProps(context) {
  const fs = require("fs");
  const remark = require("remark");
  const html = require("remark-html");

  const slug = context.params.slug;
  const path = `${process.cwd()}/contents/${slug}.md`;


  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const testMd = "| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |"


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

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/contents`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
  .filter((fn) => fn.endsWith(".md"))
  .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}

export default Blog

