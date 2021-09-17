import { makeStyles } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useCollectionStyles = makeStyles(theme => ({
  root: {
    padding: "0px 24px"
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  imgWrapper: {
    width: "50%"
  },
  projectImg: {
    width: "100%",
    borderRadius: 8,
    boxShadow: "0 2px 14px 0 rgb(69 20 229 / 10%)"
  },
  description: {
    width: "45%"
  }
}));

const Collection = props => {
  const {} = props;

  const classes = useCollectionStyles();

  const collectionSchema = [
    {
      id: "basketball",
      src: "/project-img/basketball1.png",
      description:
        "A platform lets users team up and find the nearest basketball court"
    },
    {
      id: "basketball",
      src: "/project-img/basketball2.png",
      description:
        "A platform lets users team up and find the nearest basketball court"
    },
    {
      id: "ledger",
      src: "/project-img/ledger1.png",
      description: "An account book for daily record"
    },
    {
      id: "ledger",
      src: "/project-img/ledger2.png",
      description: "An account book for daily record"
    },
    {
      id: "stylish",
      src: "/project-img/stylish1.png",
      description: "An e-commerce website selling modern clothings"
    },
    {
      id: "stylish",
      src: "/project-img/stylish2.png",
      description: "An e-commerce website selling modern clothings"
    },
    {
      id: "stylish",
      src: "/project-img/stylish3.png",
      description: "An e-commerce website selling modern clothings"
    }
  ];

  const Projects = () => {
    return collectionSchema.map((item, index) => {
      if (index % 2 === 0) {
        return (
          <div className={classes.container}>
            <div className={classes.imgWrapper}>
              <img className={classes.projectImg} src={item.src} />
            </div>
            <div className={classes.description}>{item.description}</div>
          </div>
        );
      }
      return (
        <div className={classes.container}>
          <div className={classes.description}>{item.description}</div>
          <div className={classes.imgWrapper}>
            <img className={classes.projectImg} src={item.src} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Projects />
    </div>
  );
};

export default Collection;
