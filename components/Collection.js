import Slider from "react-slick";

import { makeStyles } from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useCollectionStyles = makeStyles(theme => ({
  container: {
    padding: "0px 24px"
  },
  imgWrapper: {}
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
      src: "/project-img/stylish1.jpeg"
    },
    {
      src: "/project-img/stylish2.png"
    }
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <div className={classes.container}>
      <Slider {...settings}>
        {collectionSchema.map(item => (
          <div className={classes.imgWrapper}>
            <img src={item.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Collection;
