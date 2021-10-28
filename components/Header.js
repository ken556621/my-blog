import { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import { Grid, Button, Toolbar, Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";

import { categorySchema } from "@/constant/category";

import { DarkModeContext } from "@/context/darkModeContext";

const useHeaderStyles = makeStyles(theme => ({
  gridRoot: {
    position: "sticky",
    top: 0,
    padding: "0px 6px"
  },
  toolbar: {
    transition: "background-color 2s"
  },
  logo: {
    "& img": {
      width: 300
    }
  },
  logoWord: {
    margin: "0px 0px 0px 10px",
    padding: 0,
    fontSize: "1.5em",
    textTransform: "none"
  },
  secondLogoWord: {
    transition: "opacity .5s ease-out",
    opacity: 0
  },
  menu: {
    textAlign: "end"
  },
  selectedButtonLabel: {
    fontWeight: "bold",
    "&:after": {
      width: 10,
      height: 5,
      backgroundColor: "red"
    }
  },
  darkMode: {
    color: theme.color.word.darkMode
  }
}));

const Header = props => {
  const {
    title = "肯游扣部落格 | Yu Ken Code Blog",
    description = "紀錄自身學習程式歷程，從體能教練轉職成為前端工程師",
    sharingTitle = "從體能教練轉職前端工程師、不斷自學精進和熱愛用技術去解決身邊的問題｜Yu Ken Code Blog",
    isSecondTitle = false
  } = props;

  const classes = useHeaderStyles();

  const router = useRouter();

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleRouteChange = path => {
    router.push(path);
  };

  const handleChangeTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backToHomePage = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1"
        />
        <meta name="description" content={description} />
        <meta content={sharingTitle} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={sharingTitle} property="twitter:title" />
        <meta content={description} property="twitter:description" />
        <meta name="keywords" content="前端工程師、轉職、自學、體能教練" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="google-site-verification" content="H1MEre3sIZnXcRdwbgmTNEm94vKd3SkjiLnPcYUaEKw" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16-dunplab-manifest-28429.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32-dunplab-manifest-28429.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href="/icons/apple-icon-60x60-dunplab-manifest-28429.png"
          rel="apple-touch-icon"
          type="image/png"
          sizes="60x60"
        />
      </Head>
      <Grid
        classes={{
          root: classes.gridRoot
        }}
        item
        xs={12}
      >
        <Toolbar
          classes={{
            root: classes.toolbar
          }}
          disableGutters={true}
        >
          <Grid item xs={6}>
            <Button onClick={backToHomePage}>
              <Avatar
                className={classes.logo}
                src="/icons/favicon-32x32-dunplab-manifest-28429.png"
                alt="Ken Code"
              />
              <h1
                className={clsx(classes.logoWord, {
                  [classes.secondLogoWord]: isSecondTitle,
                  [classes.darkMode]: isDarkMode
                })}
              >
                Yu Ken Code
              </h1>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.menu}>
              {categorySchema.map(item => (
                <Button
                  key={item.id}
                  classes={{
                    label: clsx({
                      [classes.selectedButtonLabel]: item.path.includes(
                        router.query.category
                      ),
                      [classes.darkMode]: isDarkMode
                    })
                  }}
                  onClick={() => handleRouteChange(item.path)}
                >
                  {item.title}
                </Button>
              ))}
              <IconButton aria-label="changeTheme" onClick={handleChangeTheme}>
                {isDarkMode ? (
                  <Brightness4OutlinedIcon className={classes.darkMode} />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </div>
          </Grid>
        </Toolbar>
      </Grid>
    </>
  );
};

export default Header;
