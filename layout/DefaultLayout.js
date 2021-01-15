import Header from "@/components/Header";

import { makeStyles } from "@material-ui/core/styles";



const useDefaultLayoutStyles = makeStyles(theme => ({
    container: {

    }
}));

const DefaultLayout = (props) => {
    const {
        blogs = []
    } = props;

    const classes = useDefaultLayoutStyles();

    return (
        <div className={classes.container}>
            <Header
                blogs={blogs}
            />
        </div>
    )
}

export default DefaultLayout;