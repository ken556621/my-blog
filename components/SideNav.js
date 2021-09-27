import _ from "lodash";
import { Link } from "react-scroll";

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
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "flex",
    cursor: "pointer",
    display: "block"
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
