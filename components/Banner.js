import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import Header from "@/components/Header";

const useBannerStyles = makeStyles(theme => ({
  container: {
    height: 300,
    backgroundSize: "cover",
    backgroundImage: "url(/banner-img.jpg)",
    backgroundPosition: "center 70%",
    backgroundRepeat: "no-repeat"
  },
  title: {
    textAlign: "center"
  },
  infoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    textAlign: "center",
    color: "#333333",
    fontSize: ".5rem"
  },
  icon: {
    color: "#333333",
    fontSize: 18,
    "&:not(&:first-of-type)": {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1)
    },
    "&:first-of-type": {
      marginRight: theme.spacing(1)
    }
  }
}));

const Banner = props => {
  const { title = "", date = "", wordCount = "" } = props;

  const classes = useBannerStyles();

  const router = useRouter();

  const caculateTime = () => {
    if (wordCount < 200) {
      return "2 minutes";
    }
    return "3 minutes";
  };

  const ArticleInfo = () => {
    if (!date) return <></>;
    return (
      <div className={classes.infoWrapper}>
        <EventIcon className={classes.icon} />
        <span className={classes.info}>{date}</span>
        <PermMediaIcon className={classes.icon} />
        <span className={classes.info}>{router.query.category}</span>
        <LocalLibraryIcon className={classes.icon} />
        <span className={classes.info}>{wordCount}</span>
        <AccessTimeIcon className={classes.icon} />
        <span className={classes.info}>{caculateTime()}</span>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Header title={"游肯扣部落格"} />
      <h1 className={classes.title}>{title}</h1>
      <ArticleInfo />
    </div>
  );
};

export default Banner;
