import { useContext } from "react"
import Link from 'next/link'
import clsx from "clsx";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import styles from "@/styles/sideList.module.scss";

import { DrawerContext } from "@/context/drawerContext";

import { getPath, getTitle } from "@/helper/getArticleTag";


const SideArticleTags = props => {
    const {
        category = "",
        list = []
    } = props;

    if (!list.length || !category) {
        return <>No Article</>
    }

    const { drawerOpened, setDrawerOpened } = useContext(DrawerContext);

    const closeDrawer = () => {
        setDrawerOpened(false)
    };

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
    };

    return (
        <Drawer
            open={drawerOpened}
            anchor="right"
        >
            <div className={styles.container}>
                <List dense disablePadding>
                    <CustomListItem />
                </List>
                <div className={styles.btnWrapper}>
                    <IconButton
                        className={clsx({
                            [styles.iconButtonRotate]: drawerOpened
                        })}
                        onClick={closeDrawer}
                    >
                        <ArrowLeftIcon />
                    </IconButton>
                </div>
            </div>
        </Drawer>
    )
}

export default SideArticleTags;
