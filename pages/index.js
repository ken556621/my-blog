import { useCallback, useEffect, useState } from "react";

import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import Timeline from "components/Timeline";
import { baseUrl } from "@/constant/config";
import debounce from "lodash/debounce";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

const useIndexPageStyles = makeStyles(theme => ({
  headerWrapper: {
    [theme.breakpoints.up("tablet")]: {
      height: "20vh"
    },

    position: "relative",
    height: "15vh"
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

  return (
    <main>
      <div className={classes.headerWrapper}>
        <Header isSecondTitle={isSecondTitle} img={`${baseUrl}/avatar.jpg`} />
      </div>
      <PersonalInfo isSecondTitle={isSecondTitle} />
      <Timeline />
      <Collection />
      <Footer />
    </main>
  );
};

export default IndexPage;
