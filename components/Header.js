import { useRouter } from "next/router";

import { Grid, Button, Toolbar, Avatar} from "@material-ui/core";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/header.module.scss";


const Header = props => {
    const router = useRouter()

    const handleRouteChange = (path) => {
        router.push(path)
    }

    const backToHomePage = () => {
        router.push("/")
    }

    return (
        <Grid item xs={12}>
            <Toolbar>
                <Grid item xs={6}>
                    <Button onClick={backToHomePage}>
                        <Avatar src="https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg" />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <div className={styles.menu}>
                        {
                            categorySchema.map(item => (
                                <Button key={item.id} onClick={() => handleRouteChange(item.path)}>
                                    { item.title }
                                </Button>
                            ))
                        }
                    </div>
                </Grid>
            </Toolbar>
        </Grid>
    )
}

export default Header;
