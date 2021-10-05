import _ from "lodash";
import { Link } from "react-scroll";

import { makeStyles } from "@material-ui/core";

const useSideNavStyles = makeStyles(theme => ({
  root: {
    display: "none",
    position: "fixed",
    left: 0,
    top: "55%",
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
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  return (
    <div className={classes.root}>
      <h3>Table of Contents</h3>
      {secondTitleList.map((item, index) => (
        <Link
          key={index}
          className={classes.articleTag}
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
