import Link from 'next/link'

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "@/styles/sideList.module.scss"





const SideList = props => {
    const {
        category = "",
        list = []
    } = props;

    if(!list.length || !category){
        return <>No Article</>
    }

    const getAllTitle = () => {
        const titleRole = new RegExp("<h1>.+?</h1>");

        const allTitle = list.map(blog => blog.match(titleRole)[0].replace("<h1>", "").replace("</h1>", ""));

        return allTitle
    }

    return (
        <div className={styles.container}>
            <List dense disablePadding>
                {
                    getAllTitle().map((title, index) => (
                        <Link
                            key={index}
                            href={{
                                pathname: '/[category]/[title]',
                                query: { category, title: title.toLowerCase() },
                            }}
                        >
                            <a>
                                <ListItem
                                    className={styles.listItemRoot}
                                    button
                                >
                                    <ListItemText
                                        primary={title}
                                    />
                                </ListItem>
                            </a>
                        </Link>
                    ))
                }
            </List>
        </div>
    )
}

export default SideList;
