import Header from "@/components/Header";

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
  const classes = useIndexPageStyles();

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
