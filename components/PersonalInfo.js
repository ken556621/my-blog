import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const usePersonalInfoStyles = makeStyles(theme => ({
  root: {
    height: "calc(80vh)",
    padding: "0px 24px"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  avatar: {
    borderRadius: 8
  },
  subTitle: {
    margin: 0
  },
  subTitleOne: {
    width: 400
  },
  subTitleTwo: {
    width: 380
  },
  actionButton: {
    marginTop: theme.spacing(6),
    "&:hover svg": {
      transition: "all .5s ease-out",
      transform: "translate(0, 10px)"
    }
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: "#0a2f5c"
  }
}));

const PersonalInfo = props => {
  const {} = props;

  const classes = usePersonalInfoStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <h1>Hello</h1>
          <h2>I'm Ken Yu, a web frontend developer.</h2>
          <h3 className={clsx(classes.subTitle, classes.subTitleOne)}>
            A patient listener who is highly motivated to
          </h3>
          <h3 className={clsx(classes.subTitle, classes.subTitleTwo)}>
            understand the reasons behind demands
          </h3>
          <h3 className={clsx(classes.subTitle, classes.subTitleThree)}>
            optimized solutions for problems.
          </h3>
        </div>
        <img className={classes.avatar} src="/avatar.jpg" />
      </div>
      <Button
        classes={{
          root: classes.actionButton
        }}
      >
        View Projects
        <ArrowDownwardIcon className={classes.arrowIcon} />
      </Button>
    </div>
  );
};

export default PersonalInfo;
