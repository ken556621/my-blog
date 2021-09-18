import { makeStyles } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import FolderIcon from "@material-ui/icons/Folder";
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
      margin: theme.spacing(0, 1)
    },
    "&:first-of-type": {
      marginRight: theme.spacing(1)
    }
  }
}));

const Banner = props => {
  const { word = "", date = "" } = props;

  const classes = useBannerStyles();

  const ArticleInfo = () => {
    return (
      <div className={classes.infoWrapper}>
        <EventIcon className={classes.icon} />
        <span className={classes.info}>{date}</span>
        <FolderIcon className={classes.icon} />
        <span className={classes.info}>{date}</span>
        <LocalLibraryIcon className={classes.icon} />
        <span className={classes.info}>{date}</span>
        <AccessTimeIcon className={classes.icon} />
        <span className={classes.info}>{date}</span>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Header title={"游肯扣部落格"} />
      <h1 className={classes.title}>{word}</h1>
      <ArticleInfo />
    </div>
  );
};

export default Banner;
