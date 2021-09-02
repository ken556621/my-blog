import { makeStyles } from "@material-ui/core";

import Header from "@/components/Header";

const useBannerStyles = makeStyles(theme => ({
  container: {
    height: 300,
    backgroundSize: "cover",
    backgroundImage: "url(/banner-img.jpg)",
    backgroundPosition: "center 70%",
    backgroundRepeat: "no-repeat"
  },
  word: {
    textAlign: "center",
    color: "#333333"
  }
}));

const Banner = props => {
  const { word = "", date = "" } = props;

  const classes = useBannerStyles();

  return (
    <div className={classes.container}>
      <Header title={"游肯扣部落格"} />
      <h1 className={classes.word}>{word}</h1>
      <div className={classes.word}>{date}</div>
    </div>
  );
};

export default Banner;
