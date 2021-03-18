import { makeStyles } from "@material-ui/core";



const Banner = props => {
    const {
        word = "",
        date = ""
    } = props;

    const classes = useBannerStyles();

    return (
        <div className={classes.container}>
            <h1 className={classes.word}>
                {word}
            </h1>
            <div className={classes.date}>
                {date}
            </div>
        </div>
    )
}

const useBannerStyles = makeStyles((theme) => ({
    container: {
        height: 100,
        backgroundColor: "rgba(255,255,255,0.67)",
        backgroundSize: "cover",
        backgroundImage: "linear-gradient(0deg, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0.67)), url(/banner-img.jpg)",
        backgroundPosition: "center 70%",
        backgroundRepeat: "no-repeat",
        padding: "55px 15px",
        textAlign: "center"
    },
    word: {
        color: "#333333"
    }
}));

export default Banner;