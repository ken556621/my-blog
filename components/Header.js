import { useRouter } from "next/router";

import { Grid, Button, IconButton, Toolbar, Avatar} from "@material-ui/core";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/header.module.scss";


const Header = props => {
    const router = useRouter()

    const handleRouteChange = (path) => {
        router.push(path)
    }

    const backToHomePage = () => {
        router.push("/home")
    }

    return (
        <Grid item xs={12}>
            <Toolbar className={styles.toolbar}>
                <Grid item xs={6}>
                    <IconButton onClick={backToHomePage}>
                        <Avatar className={styles.logo} src="/icons/favicon-32x32-dunplab-manifest-28429.png" alt="Ken Code" />
                    </IconButton>
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
