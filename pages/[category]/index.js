
import DefaultLayout from "@/layout/DefaultLayout";

import SideList from "@/components/SideList";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/blogList.module.scss";

const List = (props) => {
    const {
        category = "",
        allFormatBlogs = []
    } = props;

    return (
        <>
            <DefaultLayout />
            <SideList
                category={category}
                list={allFormatBlogs}
            />
            {
                allFormatBlogs.map((blog, index) => (
                    <div key={index} className={styles.container}>
                        <section
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
    const MarkdownIt = require("@hackmd/markdown-it");

    const files = fs.readdirSync(`${process.cwd()}/contents/${category}`, "utf-8");

    const allMdFiles = files.filter(fn => fn.endsWith(".md"));

    const allContent = allMdFiles.map(mdFile => fs.readFileSync(`${process.cwd()}/contents/${category}/${mdFile}`, {
        encoding: "utf-8",
    }))

    const md = new MarkdownIt();

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