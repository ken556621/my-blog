import { useEffect, useState, useCallback } from "react";
import { scroller } from "react-scroll";
import debounce from "lodash/debounce";

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

  const [isSecondTitle, setIsSecondTitle] = useState(false);

  const handleUpdateSecondTitle = hasScrollDown => {
    setIsSecondTitle(hasScrollDown);
  };

  const scrollChangeDebounce = useCallback(
    debounce(hasScrollDown => handleUpdateSecondTitle(hasScrollDown), 10),
    []
  );

  useEffect(() => {
    const onScroll = event => {
      if (event.target.documentElement.scrollTop > 30) {
        scrollChangeDebounce(true);
        return;
      }
      scrollChangeDebounce(false);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (router.query.portfolio) {
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
        <Header isSecondTitle={isSecondTitle} />
      </div>
      <PersonalInfo isSecondTitle={isSecondTitle} />
      <Collection />
      <Footer />
    </>
  );
};

export default IndexPage;
