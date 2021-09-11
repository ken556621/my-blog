import { makeStyles } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useCollectionStyles = makeStyles(theme => ({
  container: {
    padding: "0px 24px"
  },
  imgWrapper: {},
  img: {
    width: "50%"
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

  return (
    <div className={classes.container}>
      {collectionSchema.map(item => (
        <div className={classes.imgWrapper}>
          <img className={classes.img} src={item.src} />
        </div>
      ))}
    </div>
  );
};

export default Collection;
