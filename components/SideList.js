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

    const getTitle = content => {
        const titleRole = new RegExp("<h1>.+?</h1>");

        if(!titleRole){
            return ""
        }

        const title = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "");

        return title
      }

    const getPath = content => {
        const titleRole = new RegExp("<p>tags:.+?</p>");

        if(!titleRole){
            return ""
        }

        const path = content.match(titleRole)[0].replace("<p>tags:", "").replace("</p>", "").toLowerCase();

        return path
    }

    const CustomListItem = () => {
        return (
            list.map((content, index) => (
                <ListItem
                    key={index}
                    className={styles.listItemRoot}
                    button
                >
                    <Link
                        key={index}
                        href={{
                            pathname: '/[category]/[title]',
                            query: { category, title: getPath(content) }
                        }}
                    >
                        <a>
                            <ListItemText
                                primary={getTitle(content)}
                            />
                        </a>
                    </Link>
                </ListItem>
            ))
        )
    }

    return (
        <div className={styles.container}>
            <List dense disablePadding>
                <CustomListItem />
            </List>
        </div>
    )
}

export default SideList;
