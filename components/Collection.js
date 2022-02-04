import { animated, to as interpolate, useSprings } from "react-spring";
import { useContext, useState } from "react";

import { DarkModeContext } from "@/context/darkModeContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useDrag } from "react-use-gesture";

const useCollectionStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "35vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    cursor: "grab",

    [theme.breakpoints.up("laptop")]: {
      height: "60vh"
    },

    "& > div": {
      position: "absolute",
      width: "100vw",
      maxWidth: 1440,
      willChange: "transform",
      display: "flex !important",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 0,

      [theme.breakpoints.up("laptop")]: {
        gap: 10,
      }
    },

    "& > div .img": {
      backgroundSize: "100% auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "80%",
      minHeight: "18vh",
      willChange: "transform",
      boxShadow: "0 2px 14px 0 rgb(69 20 229 / 10%)",
      
      [theme.breakpoints.up("laptop")]: {
        width: "50%",
        minHeight: "35vh",
      }
    },

    "& > div .word": {
      padding: "0px 20px",
      width: "100%",
      minHeight: "48vh",
      backgroundColor: "#f8fbff",
      borderRadius: 8,
      display: "none",
      transition: "background-color 2s",

      [theme.breakpoints.up("laptop")]: {
        width: "30%",
        padding: 50,
        display: "block"
      }
    },
  },
  description: {},
  darkMode: {
    "& > div .word": {
      backgroundColor: "#121212",
      "& ul li": {
        color: theme.color.word.darkMode,
      }
    },
  },
}));

const Collection = () => {
  const classes = useCollectionStyles();
  const { isDarkMode } = useContext(DarkModeContext);

  const [gone] = useState(() => new Set());

  const collectionSchema = [
    {
      id: "stylish",
      src: "/project-img/stylish3.png",
      description: [
        "Supported RWD with pure CSS",
        "Connected to RESTful APIs by AJAX for fetching data from server side",
        "Integrated Facebook Login API",
        "Applied Google Analytics for tracking user's behavior",
        "Applied Local Storage for Shopping Cart",
        "Integrated TapPay as Payment Solution",
      ],
    },
    {
      id: "stylish",
      src: "/project-img/stylish1.png",
      description: [
        "An e-commerce website selling modern clothings"
      ],
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
        "Supported Facebook Login with Passport and Passport Facebook",
      ],
    },
    {
      id: "ledger",
      src: "/project-img/ledger1.png",
      description: [
        "An account book for daily record",
      ]
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
        "Implemented Geohash to recommend the nearest basketball courts for users",
      ],
    },
    {
      id: "basketball",
      src: "/project-img/basketball1.png",
      description:[
        "A platform lets users team up and find the nearest basketball court"
      ],
    },
  ];

  const windowInnerWidth =
    typeof window === "object" ? window.innerWidth : 1440;
  const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });
  const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

  const [props, set] = useSprings(collectionSchema.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        gone.add(index);
      }

      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + windowInnerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === collectionSchema.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  const renderDescription = (description) => {
    return description.map((item) => (
      <ul>
        <li>
         {item}
        </li>
      </ul>
    ));
  };

  const renderCollection = () => {
    return props.map(({ x, y, rot, scale }, i) => (
      <animated.div key={i} style={{ x, y }}>
        <animated.div
          className="img"
          style={{
            transform: interpolate([rot, scale], trans),
            backgroundImage: `url(${collectionSchema[i].src})`,
          }}
          {...bind(i)}
        />
        <animated.div 
          className="word" 
          {...bind(i)}
        >
          {renderDescription(collectionSchema[i].description)}
        </animated.div>
      </animated.div>
    ));
  };

  return (
    <div id="collection" className={clsx(classes.root, {
      [classes.darkMode]: isDarkMode
    })}>
      {renderCollection()}
    </div>
  );
};

export default Collection;
