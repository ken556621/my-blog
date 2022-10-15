import { Button, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import Link from "next/link";

import { categorySchema } from "@/constant/category";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

const BurgerMenu = () => {
  const classes = useBurgerMenuStyle();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        classes={{
          label: classes.buttonLabel,
        }}
        onClick={handleClick}
        aria-label="Burger Button"
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
        {categorySchema.map((item) => (
          <MenuItem
            classes={{
              label: clsx({
                [classes.selectedButtonLabel]: item.path.includes(
                  router.query.category
                )
              }),
            }}
            key={item.id}
          >
            <Link href={item.path}>
              <a className={classes.nav}>
                {item.title}
              </a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BurgerMenu;

const useBurgerMenuStyle = makeStyles((theme) => ({
  buttonLabel: {
    flexDirection: "column",
    color: "red"
  },
  line: {
    backgroundColor: theme.color.word.main,
    width: 25,
    height: 3,
    borderRadius: 3,
    "&:not(&:last-of-type)": {
      marginBottom: 4,
    },
  },
  nav: {
    color: "#333"
  }
}));
