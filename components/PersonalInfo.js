import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import { DarkModeContext } from "@/context/darkModeContext";
import { Link } from "react-scroll";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useContext } from "react";

const usePersonalInfoStyles = makeStyles(theme => ({
  root: {
    height: "calc(80vh)",
    padding: "0px 24px"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  secondTitle: {
    animation: "$fadein 1s linear 1"
  },
  "@keyframes fadein": {
    from: { opacity: 0 },
    to: { opacity: 1 }
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
  buttonWrapper: {
    display: "flex",
    alignItems: "center"
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: "#4172b0"
  },
  darkModeTitle: {
    color: theme.color.secondWord.darkMode
  }
}));

const PersonalInfo = props => {
  const { isSecondTitle } = props;

  const { isDarkMode } = useContext(DarkModeContext);

  const classes = usePersonalInfoStyles();

  const renderTitle = () => {
    return isSecondTitle ? "Yu Ken Code" : "Hello";
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <h1
            className={clsx({
              [classes.secondTitle]: isSecondTitle,
              [classes.darkModeTitle]: isDarkMode
            })}
          >
            {renderTitle()}
          </h1>
          <h2
            className={clsx({
              [classes.darkModeTitle]: isDarkMode
            })}
          >
            I'm Ken, a web frontend developer.
          </h2>
          <h3
            className={clsx(classes.subTitle, classes.subTitleOne, {
              [classes.darkModeTitle]: isDarkMode
            })}
          >
            A patient listener who is highly motivated to
          </h3>
          <h3
            className={clsx(classes.subTitle, classes.subTitleTwo, {
              [classes.darkModeTitle]: isDarkMode
            })}
          >
            understand the reasons behind demands
          </h3>
          <h3
            className={clsx(classes.subTitle, classes.subTitleThree, {
              [classes.darkModeTitle]: isDarkMode
            })}
          >
            optimized solutions for problems.
          </h3>
        </div>
        <img className={classes.avatar} src="/avatar.jpg" alt="Person Img" />
      </div>
      <Button
        classes={{
          root: classes.actionButton
        }}
      >
        <Link className={classes.buttonWrapper} to="collection" smooth={true}>
          View Projects
          <ArrowDownwardIcon className={classes.arrowIcon} />
        </Link>
      </Button>
    </div>
  );
};

export default PersonalInfo;
