import { useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import { Grid, Button, Toolbar, Avatar, IconButton } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";

import BurgerMenu from "@/components/BurgerMenu";

import { categorySchema } from "@/constant/category";
import { DarkModeContext } from "@/context/darkModeContext";

const useTopNavStyles = makeStyles(theme => ({
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
    textAlign: "end",
    display: "none",
    [theme.breakpoints.up("tablet")]: {
      display: "block"
    }
  },
  burgerMenu: {
    textAlign: "end",
    display: "block",
    [theme.breakpoints.up("tablet")]: {
      display: "none"
    }
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

const TopNav = props => {
  const { isSecondTitle = false } = props;

  const classes = useTopNavStyles();

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
          <div className={classes.burgerMenu}>
            <BurgerMenu />
          </div>
        </Grid>
      </Toolbar>
    </Grid>
  );
};

export default TopNav;