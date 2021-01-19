

import { makeStyles } from "@material-ui/core/styles";

import { categorySchema } from "@/constant/category";


const useListStyles = makeStyles(theme => ({
  container: {
    height: 500,
    overflow: "hidden"
  }
}));

const List = (props) => {
    const {
        allFormatBlogs = []
    } = props;

    const classes = useListStyles();

    return (
        allFormatBlogs.map((blog, index) => (
            <div key={index}>
                <h1>{blog.info.title}</h1>
                <section
                    className={classes.container}
                    dangerouslySetInnerHTML={{ __html: blog.content.toString() }}
                />
            </div>
        ))
    )
}


export async function getStaticProps(context) {
    const fs = require("fs");
    const remark = require("remark");
    const html = require("remark-html");
    const matter = require("gray-matter");

    const files = fs.readdirSync(`${process.cwd()}/contents/${context.params.category}`, "utf-8");

    const allFormatBlogs = [];

    const allMdFiles = files.filter(fn => fn.endsWith(".md"));

    const allContent = allMdFiles.map(mdFile => fs.readFileSync(`${process.cwd()}/contents/${context.params.category}/${mdFile}`, {
        encoding: "utf-8",
    }))

    const parseContent = async () => {
        for (let i = 0; i < allContent.length; i++) {
            const content = await remark()
            .use(html)
            .process(allContent[i])

            const { data } = matter(allContent[i]);

            const result = {
                info: data,
                content: content.contents
            }

            allFormatBlogs.push(result);
        }
    }

    await parseContent();

    return {
        props: {
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