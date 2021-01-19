import Header from "@/components/Header";

import { makeStyles } from "@material-ui/core/styles";



const useDefaultLayoutStyles = makeStyles(theme => ({

}));

const DefaultLayout = (props) => {
    const classes = useDefaultLayoutStyles();

    return (
        <div>
            <Header />
        </div>
    )
}

export default DefaultLayout;