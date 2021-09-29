import _ from "lodash";
import { Link } from "react-scroll";
import clsx from "clsx";

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
    borderLeft: "1px solid #333333"
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
      left: 10
    }
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  return (
    <div className={classes.root}>
      <h3>Table of Contents</h3>
      {secondTitleList.map(item => (
        <Link
          className={clsx(classes.articleTag, {
            [classes.toggleTag]: true
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
