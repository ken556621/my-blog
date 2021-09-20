import clsx from "clsx";
import { Link } from "react-scroll";

import { makeStyles } from "@material-ui/core";

const useSideNavStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    right: 0,
    top: "55%"
  }
}));

const SideNav = props => {
  const { secondTitleList } = props;

  const classes = useSideNavStyles();

  return (
    <div className={classes.root}>
      {secondTitleList.map(item => (
        <div>{item}</div>
      ))}
    </div>
  );
};

export default SideNav;
