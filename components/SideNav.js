import { useContext } from "react";
import _ from "lodash";
import { Link } from "react-scroll";
import clsx from "clsx";
import { DarkModeContext } from "@/context/darkModeContext";

import { makeStyles } from "@material-ui/core";

const useSideNavStyles = makeStyles(theme => ({
  root: {
    display: "none",
    position: "sticky",
    top: 0,
    float: "left",
    marginTop: 95,
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("laptop")]: {
      display: "block"
    }
  },
  articleTag: {
    width: 150,
    paddingLeft: theme.spacing(2),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "flex",
    cursor: "pointer",
    display: "block",
    color: "#0a2f5c",
    fontSize: ".8rem"
  },
  darkModeTitle: {
    color: theme.color.secondWord.darkMode
  },
  darkModeLink: {
    color: "rgb(138, 180, 248)"
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={classes.root}>
      <h3
        className={clsx({
          [classes.darkModeTitle]: isDarkMode
        })}
      >
        Table of Contents
      </h3>
      {secondTitleList.map((item, index) => (
        <Link
          key={index}
          className={clsx(classes.articleTag, {
            [classes.darkModeLink]: isDarkMode
          })}
          to={_.snakeCase(item)}
          smooth={true}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
