import { a, useSpring } from "@react-spring/web";
import { useContext, useRef } from "react";
import Link from "next/link";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import { DarkModeContext } from "@/context/darkModeContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import useHover from "@react-hook/hover";

const usePersonalInfoStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("tablet")]: {
      height: "40vh",
    },
    height: "80vh",
    padding: "0px 24px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 30,
  },
  avatarWrapper: {
    position: "relative",
    cursor: "pointer",
    minWidth: 300,
    minHeight: 212,
    [theme.breakpoints.up("tablet")]: {
      minHeight: 262,
      minWidth: 350,
    },
  },
  wordWrapper: {},
  secondTitle: {
    animation: "$fadein 1s linear 1",
  },
  "@keyframes fadein": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  avatar: {
    position: "absolute",
    left: -10,
    borderRadius: 8,
    width: 300,
    height: 212,
    backgroundSize: "cover",
    [theme.breakpoints.up("tablet")]: {
      right: 0,
      width: 350,
      height: 262,
    },
  },
  subTitle: {
    margin: 0,
  },
  subTitleOne: {
    [theme.breakpoints.up("laptop")]: {
      width: 400,
    },
  },
  subTitleTwo: {
    [theme.breakpoints.up("laptop")]: {
      width: 380,
    },
  },
  actionButton: {
    marginTop: theme.spacing(6),
    "&:hover svg": {
      transition: "all .5s ease-out",
      transform: "translate(0, 10px)",
    },
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    fontSize: 18,
    color: "#4172b0",
  },
  darkModeTitle: {
    color: theme.color.secondWord.darkMode,
  },
  front: {
    backgroundImage: "url(/avatar.jpg);",
  },
  back: {
    backgroundImage: "url(/avatar2.jpg);",
  },
}));

const PersonalInfo = ({ isSecondTitle }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  const target = useRef(null);
  const isHovering = useHover(target, { enterDelay: 0, leaveDelay: 200 });
  const { transform, opacity } = useSpring({
    opacity: isHovering ? 1 : 0,
    transform: `perspective(600px) rotateX(${isHovering ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const classes = usePersonalInfoStyles();

  const renderTitle = () => {
    return isSecondTitle ? "Yu Ken Code" : "Hello";
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.wordWrapper}>
          <h1
            className={clsx({
              [classes.secondTitle]: isSecondTitle,
              [classes.darkModeTitle]: isDarkMode,
            })}
          >
            {renderTitle()}
          </h1>
          <h2
            className={clsx({
              [classes.darkModeTitle]: isDarkMode,
            })}
          >
            I'm Ken, a Software Engineer.
          </h2>
          <h3
            className={clsx(classes.subTitle, classes.subTitleOne, {
              [classes.darkModeTitle]: isDarkMode,
            })}
          >
            A patient listener who is highly motivated to
          </h3>
          <h3
            className={clsx(classes.subTitle, classes.subTitleTwo, {
              [classes.darkModeTitle]: isDarkMode,
            })}
          >
            understand the reasons behind demands
          </h3>
          <h3
            className={clsx(classes.subTitle, classes.subTitleThree, {
              [classes.darkModeTitle]: isDarkMode,
            })}
          >
            optimized solutions for problems.
          </h3>
        </div>
        <div className={classes.avatarWrapper} ref={target}>
          <a.div
            className={`${classes.avatar} ${classes.front}`}
            style={{ opacity: opacity.to((o) => 1 - o), transform }}
          />
          <a.div
            className={`${classes.avatar} ${classes.back}`}
            style={{
              opacity,
              transform,
              rotateX: "180deg",
            }}
          />
        </div>
      </div>
      <Button
        classes={{
          root: classes.actionButton,
        }}
        aria-label="View more"
      >
        <Link href="#collection">
          <a className={classes.buttonWrapper}>
            View Projects (Drag left or right...)
            <ArrowDownwardIcon className={classes.arrowIcon} />
          </a>
        </Link>
      </Button>
    </div>
  );
};

export default PersonalInfo;
