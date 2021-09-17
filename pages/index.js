import { useEffect } from "react";
import { scroller } from "react-scroll";

import Header from "@/components/Header";

import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core";

import PersonalInfo from "@/components/PersonalInfo";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";

const useIndexPageStyles = makeStyles(theme => ({
  headerWrapper: {
    position: "relative",
    height: "25vh"
  }
}));

const IndexPage = props => {
  const router = useRouter();

  const classes = useIndexPageStyles();

  useEffect(() => {
    if (router.query.portfolio) {
      console.log("qqq");
      scroller.scrollTo("collection", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    }
  }, [router.query]);

  return (
    <>
      <div className={classes.headerWrapper}>
        <Header />
      </div>
      <PersonalInfo />
      <Collection />
      <Footer />
    </>
  );
};

export default IndexPage;
