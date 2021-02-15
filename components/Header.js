import { useRouter } from "next/router";
import Head from "next/head";

import { Grid, Button, Toolbar, Avatar} from "@material-ui/core";

import { categorySchema } from "@/constant/category";

import styles from "@/styles/header.module.scss";


const Header = props => {
    const {
        title = "肯游扣部落格 | Yu Ken Code Blog",
        description = "紀錄自身學習程式歷程，從體能教練轉職成為前端工程師",
        sharingTitle = "從體能教練轉職前端工程師、不斷自學精進和熱愛用技術去解決身邊的問題｜Yu Ken Code Blog"
    } = props;

    const router = useRouter()

    const handleRouteChange = (path) => {
        router.push(path)
    }

    const backToHomePage = () => {
        router.push("/")
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
                <meta name="description" content={description} />
                <meta content={sharingTitle} property="og:title" />
                <meta content={description} property="og:description" />
                <meta content={sharingTitle} property="twitter:title" />
                <meta content={description} property="twitter:description" />
                <meta name="keywords" content="前端工程師、轉職、自學、體能教練" />
                <meta name="theme-color" content="#317EFB" />

                <link rel="manifest" href="/manifest.json" />
                <link href="/icons/favicon-16x16-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/favicon-32x32-dunplab-manifest-28429.png" rel="icon" type="image/png" sizes="32x32" />
                <link href="/icons/apple-icon-60x60-dunplab-manifest-28429.png" rel="apple-touch-icon" type="image/png" sizes="60x60" />
            </Head>
            <Grid item xs={12}>
                <Toolbar className={styles.toolbar}>
                    <Grid item xs={6}>
                        <Button onClick={backToHomePage}>
                            <Avatar className={styles.logo} src="/icons/favicon-32x32-dunplab-manifest-28429.png" alt="Ken Code" />
                            <h1 className={styles.logoWord}>
                                Yu Ken Code
                            </h1>
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
        </>
    )
}

export default Header;
