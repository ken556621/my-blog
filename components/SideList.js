import Link from 'next/link'

import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const SideList = props => {
    const {
        category = "",
        list = []
    } = props;

    const classes = useSideListStyles();

    if (!list.length || !category) {
        return <>No Article</>
    }

    const getTitle = content => {
        const titleRole = new RegExp("<h1>.+?</h1>");

        if (!titleRole) {
            return ""
        }

        const title = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "");

        return title
    };

    const getPath = content => {
        const titleRole = new RegExp("<p>tags:.+?</p>");

        if (!titleRole) {
            return ""
        }

        const path = content.match(titleRole)[0].replace("<p>tags:", "").replace("</p>", "").toLowerCase();

        return path
    };

    const CustomListItem = () => {
        return (
            list.map((content, index) => (
                <ListItem
                    key={index}
                    className={classes.listItemRoot}
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
    };

    return (
        <div className={classes.container}>
            <List dense disablePadding>
                <CustomListItem />
            </List>
        </div>
    )
}

const useSideListStyles = makeStyles((theme) => ({
    container: {
        position: "fixed",
        top: "15%",
        right: 0,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 2px 14px 0 rgb(137 174 255 / 20%)",
        "& a": {
            color: "#000000",
            textDecoration: "none"
        }
    },
    listItemRoot: {
        display: "block"
    }
}));

export default SideList;
