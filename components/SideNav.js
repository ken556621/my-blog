import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { Link } from "react-scroll";
import clsx from "clsx";
import debounce from "lodash/debounce";

import { makeStyles } from "@material-ui/core";

const useSideNavStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    left: 0,
    top: "55%",
    padding: theme.spacing(0, 2)
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
    borderLeft: "1px solid #333333",
    fontSize: ".8rem"
  },
  toggleTag: {
    borderLeft: "none",
    "&:before": {
      content: "''",
      borderStyle: "solid",
      borderWidth: "5px 0 5px 8px",
      borderColor: "transparent transparent transparent #00bde7",
      position: "absolute",
      marginTop: 6,
      left: 15
    }
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  const [secondTitleOffsetList, setSecondTitleOffsetList] = useState([]);
  const [intersectTitleList, setintersectTitleList] = useState([]);

  const getSecondTitleOffsetList = () => {
    return secondTitleList.map(item => {
      const offsetTop = document
        .getElementById(_.snakeCase(item))
        .getBoundingClientRect().top;
      return {
        id: item,
        offsetTop
      };
    });
  };

  const checkMeetSecondTitle = scrollTop => {
    let result = [];
    secondTitleOffsetList.forEach(item => {
      if (item.offsetTop <= scrollTop) {
        result = [item.id];
      }
    });

    return result;
  };

  const handleScroll = scrollTop => {
    const result = checkMeetSecondTitle(scrollTop);

    setintersectTitleList(result);
  };

  const scrollChangeDebounce = useCallback(
    debounce(scrollTop => handleScroll(scrollTop), 30),
    []
  );

  // useEffect(() => {
  //   if (!document) return;

  //   setSecondTitleOffsetList(getSecondTitleOffsetList());
  // }, [document]);

  // useEffect(() => {
  //   const onScroll = event => {
  //     const scrollTop = event.target.documentElement.scrollTop;

  //     scrollChangeDebounce(scrollTop);
  //   };
  //   window.addEventListener("scroll", onScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  return (
    <div className={classes.root}>
      <h3>Table of Contents</h3>
      {secondTitleList.map(item => (
        <Link
          className={clsx(classes.articleTag, {
            [classes.toggleTag]: intersectTitleList.includes(_.snakeCase(item))
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
