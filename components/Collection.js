import { useContext } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { DarkModeContext } from "@/context/darkModeContext";

const useCollectionStyles = makeStyles(theme => ({
  root: {
    padding: "0px 24px"
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  imgWrapper: {
    width: "50%"
  },
  projectImg: {
    width: "100%",
    borderRadius: 8,
    boxShadow: "0 2px 14px 0 rgb(69 20 229 / 10%)"
  },
  description: {
    width: "45%"
  },
  itemList: {
    marginRight: theme.spacing(2)
  },
  darkModeTitle: {
    color: theme.color.secondWord.darkMode
  }
}));

const Collection = props => {
  const {} = props;

  const classes = useCollectionStyles();

  const { isDarkMode } = useContext(DarkModeContext);

  const collectionSchema = [
    {
      id: "basketball",
      src: "/project-img/basketball1.png",
      description:
        "A platform lets users team up and find the nearest basketball court"
    },
    {
      id: "basketball",
      src: "/project-img/basketball2.png",
      description: [
        "Built a SPA with React and React Router",
        "Applied Redux for global state management",
        "Applied Material-Ui for better user interface",
        "Supported RWD with SCSS to create excellent mobile user experience",
        "Managed data with CRUD with Firebase Firestore",
        "Applied Cloud Functions to fetch Google Map API and open source API",
        "Implemented Geohash to recommend the nearest basketball courts for users"
      ]
    },
    {
      id: "ledger",
      src: "/project-img/ledger1.png",
      description: "An account book for daily record"
    },
    {
      id: "ledger",
      src: "/project-img/ledger2.png",
      description: [
        "Built a web with Node.js and Express.js",
        "Managed data with CRUD with MongoDB",
        "Analyzed each category of expenses in a period and displayed with Chart.js",
        "Applied Handlebars to generate HTML template",
        "Integrated Bcrypt.js to hash password",
        "Applied Moment.js to handle time converting",
        "Implemented Connect-Flash to display error message",
        "Supported Facebook Login with Passport and Passport Facebook"
      ]
    },
    {
      id: "stylish",
      src: "/project-img/stylish1.png",
      description: "An e-commerce website selling modern clothings"
    },
    {
      id: "stylish",
      src: "/project-img/stylish3.png",
      description: [
        "Supported RWD with pure CSS",
        "Connected to RESTful APIs by AJAX for fetching data from server side",
        "Integrated Facebook Login API",
        "Applied Google Analytics for tracking user's behavior",
        "Applied Local Storage for Shopping Cart",
        "Integrated TapPay as Payment Solution"
      ]
    }
  ];

  const StackList = ({ list }) => {
    return list.map((item, index) => (
      <ListItem key={index} dense>
        <span
          className={clsx(classes.itemList, {
            [classes.darkModeTitle]: isDarkMode
          })}
        >
          -
        </span>
        <ListItemText
          classes={{
            primary: clsx({ [classes.darkModeTitle]: isDarkMode })
          }}
          primary={item}
        />
      </ListItem>
    ));
  };

  const renderProjects = () => {
    return collectionSchema.map((item, index) => {
      if (index % 2 === 0) {
        return (
          <div key={index} className={classes.container}>
            <div className={classes.imgWrapper}>
              <img
                className={classes.projectImg}
                src={item.src}
                alt={item.id}
              />
            </div>
            <h3
              className={clsx(classes.description, {
                [classes.darkModeTitle]: isDarkMode
              })}
            >
              {item.description}
            </h3>
          </div>
        );
      }
      return (
        <div className={classes.container}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <StackList list={item.description} />
          </List>
          <div className={classes.imgWrapper}>
            <img className={classes.projectImg} src={item.src} alt={item.id} />
          </div>
        </div>
      );
    });
  };

  return (
    <div id="collection" className={classes.root}>
      {renderProjects()}
    </div>
  );
};

export default Collection;
