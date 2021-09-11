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
    width: 300
  }
}));

const Collection = props => {
  const {} = props;

  const classes = useCollectionStyles();

  const collectionSchema = [
    {
      src: "/project-img/basketball1.png"
    },
    {
      src: "/project-img/basketball2.png"
    },
    {
      src: "/project-img/ledger1.png"
    },
    {
      src: "/project-img/ledger2.png"
    },
    {
      src: "/project-img/stylish1.png"
    },
    {
      src: "/project-img/stylish2.png"
    },
    {
      src: "/project-img/stylish3.png"
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
            <div className={classes.description}>
              kkk=========================
            </div>
          </div>
        );
      }
      return (
        <div className={classes.container}>
          <div className={classes.description}>
            kkk=========================
          </div>
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
