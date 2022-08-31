import { DarkModeContext } from "@/context/darkModeContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useContext } from "react";
import Link from "next/link";

const useSideNavStyles = makeStyles(theme => ({
  root: {
    display: "none",
    position: "sticky",
    top: 0,
    float: "right",
    marginTop: 95,
    padding: "0px 10px 10px 10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgb(0 0 0 / 25%)",
    borderRadius: 15,
    transition: "background-color 2s",
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
  },
  backgroundDarkMode: {
    backgroundColor: theme.color.background.darkMode
  },
  title: {
    margin: "10px 0px"
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={clsx(classes.root, {
        [classes.backgroundDarkMode]: isDarkMode
      })}
    >
      <div
        className={clsx(classes.title, {
          [classes.darkModeTitle]: isDarkMode
        })}
      >
        Table of Contents
      </div>
      {secondTitleList.map((item, index) => (
        <Link
          key={index}
          href={`#${item.replace(/ /g, "")}`}
        >
          <a 
            className={clsx(classes.articleTag, {
              [classes.darkModeLink]: isDarkMode
            })}
          >
            {item}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
