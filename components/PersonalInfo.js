import clsx from "clsx";

import { makeStyles } from "@material-ui/core";

const usePersonalInfoStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "calc(60vh)",
    padding: "0px 24px"
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
  }
}));

const PersonalInfo = props => {
  const {} = props;

  const classes = usePersonalInfoStyles();

  return (
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
  );
};

export default PersonalInfo;
