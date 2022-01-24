import { useCallback, useEffect, useState } from "react";

import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PersonalInfo from "@/components/PersonalInfo";
import { baseUrl } from "@/constant/config";
import debounce from "lodash/debounce";
import { makeStyles } from "@material-ui/core";
import { scroller } from "react-scroll";
import { useRouter } from "next/router";

const useIndexPageStyles = makeStyles(theme => ({
  headerWrapper: {
    [theme.breakpoints.up("tablet")]: {
      height: "25vh"
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

  useEffect(() => {
    if (router.query.portfolio) {
      scroller.scrollTo("collection", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart"
      });
    }
  }, [router.query]);

  const collectionSchema = [
    {
      id: "basketball",
      src: "/project-img/basketball1.png",
      description:
        "A platform lets users team up and find the nearest basketball court",
    },
    {
      id: "basketball",
      src: "/project-img/basketball2.png",
      description: [
        "Built a SPA with React and React Router",
        "Applied Redux for global state management",
        "Applied Material-Ui for better user interface",
        "Supported RWD with SCSS to create excellent mobile user experience",
        "Managed data with CRUD with Firebase Firestore",
        "Applied Cloud Functions to fetch Google Map API and open source API",
        "Implemented Geohash to recommend the nearest basketball courts for users",
      ],
    },
    {
      id: "ledger",
      src: "/project-img/ledger1.png",
      description: "An account book for daily record",
    },
    {
      id: "ledger",
      src: "/project-img/ledger2.png",
      description: [
        "Built a web with Node.js and Express.js",
        "Managed data with CRUD with MongoDB",
        "Analyzed each category of expenses in a period and displayed with Chart.js",
        "Applied Handlebars to generate HTML template",
        "Integrated Bcrypt.js to hash password",
        "Applied Moment.js to handle time converting",
        "Implemented Connect-Flash to display error message",
        "Supported Facebook Login with Passport and Passport Facebook",
      ],
    },
    {
      id: "stylish",
      src: "/project-img/stylish1.png",
      description: "An e-commerce website selling modern clothings",
    },
    {
      id: "stylish",
      src: "/project-img/stylish3.png",
      description: [
        "Supported RWD with pure CSS",
        "Connected to RESTful APIs by AJAX for fetching data from server side",
        "Integrated Facebook Login API",
        "Applied Google Analytics for tracking user's behavior",
        "Applied Local Storage for Shopping Cart",
        "Integrated TapPay as Payment Solution",
      ],
    },
  ];

  return (
    <main>
      <div className={classes.headerWrapper}>
        <Header isSecondTitle={isSecondTitle} img={`${baseUrl}/avatar.jpg`} />
      </div>
      <PersonalInfo isSecondTitle={isSecondTitle} />
      <Collection />
      <Footer />
    </main>
  );
};

export default IndexPage;
