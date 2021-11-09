import { useState, useContext } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import { Button, Menu, MenuItem } from "@material-ui/core";

import { categorySchema } from "@/constant/category";
import { DarkModeContext } from "@/context/darkModeContext";

const useBurgerMenuStyle = makeStyles(theme => ({
  buttonLabel: {
    flexDirection: "column"
  },
  line: {
    backgroundColor: theme.color.word.main,
    width: 25,
    height: 3,
    borderRadius: 3,
    "&:not(&:last-of-type)": {
      marginBottom: 4
    }
  }
}));

const BurgerMenu = () => {
  const classes = useBurgerMenuStyle();
  const router = useRouter();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRouteChange = path => {
    router.push(path);
  };

  return (
    <div>
      <Button
        classes={{
          label: classes.buttonLabel
        }}
        onClick={handleClick}
      >
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {categorySchema.map(item => (
          <MenuItem
            classes={{
              label: clsx({
                [classes.selectedButtonLabel]: item.path.includes(
                  router.query.category
                ),
                [classes.darkMode]: isDarkMode
              })
            }}
            key={item.id}
            onClick={() => handleRouteChange(item.path)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BurgerMenu;
