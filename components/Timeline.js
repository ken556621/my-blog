import ApartmentIcon from "@material-ui/icons/Apartment";
import { DarkModeContext } from "@/context/darkModeContext";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import SchoolIcon from "@material-ui/icons/School";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContainer from "@mui/lab/Timeline";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { rpx } from "@/helper/devise";
import { useContext } from "react";

const useTimelineStyles = makeStyles((theme) => ({
  timelineContainerRoot: {
    margin: "75px 0px 30px 0px",

    [theme.breakpoints.up("laptop")]: {
      margin: "130px 0px",
    },
  },
  companyTitle: {
    margin: 0,
    fontSize: rpx(28),
  },
  jobTitle: {
    fontSize: rpx(22),
  },
  companyLogo: {
    height: 36,
    width: 36,
    borderRadius: "50%",
  },
  darkMode: {
    "& h1, & h2": {
      color: theme.color.word.darkMode,
    },
  }
}));

const Timeline = () => {
  const classes = useTimelineStyles();
  const { isDarkMode } = useContext(DarkModeContext);

  const timelineSchema = [
    {
      company: "Vocus",
      lastTime: "Nov. 2021 - Now",
      jobTitle: "Frontend Engineer",
      achievement: [],
      icon: <img className={classes.companyLogo} src="/icons/vocus.jpg" />,
    },
    {
      company: "CloudMile",
      lastTime: "June. 2020 - Sept. 2021",
      jobTitle: "Frontend Engineer",
      achievement: [],
      icon: <img className={classes.companyLogo} src="/icons/cloudMile.jpeg" />,
    },
    {
      company: "AppWorks School",
      lastTime: "Nov. 2019 - Apr. 2020",
      jobTitle: "Trainee",
      achievement: [
        "Admitted by AppWorks School with acceptance rate lower than 10%",
        "Designated an e-commerce website and completed in 3 weeks",
        "Collaborated with iOS and backend engineers to add displaying shop's location on google map, selecting clothings by color and customer service on Stylish",
        "Built a single page application on the personal project  with React, Redux and React Router in 5 weeks",
      ],
      icon: <ApartmentIcon />,
    },
    {
      company: "Akrofitness",
      lastTime: "Apr. 2017 - Aug. 2019",
      jobTitle: "Strength and Condition Coach",
      achievement: [
        "Ranked top 3 among 28 coaches with over 90% student retention rate after taking 80 courses",
        "Implemented medical theories like Applied Kinesiology and Muscle Anatomy to enhance the effectiveness of training",
        "Created customized training programs for 100+ students including those with endocrine disorders and assisted them in achieving their goals",
      ],
      icon: <FitnessCenterIcon />,
    },
    {
      company: "National Taiwan Normal University",
      jobTitle: "Student",
      achievement: ["Department of Geography"],
      lastTime: "Nov. 2021 - Now",
      icon: <SchoolIcon />,
    },
  ];

  const renderTimelineItems = () => {
    return timelineSchema.map((item) => (
      <TimelineItem key={item.company}>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>{item.icon}</TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={clsx(classes.container, {
            [classes.darkMode]: isDarkMode,
          })}
        >
          <h1 className={classes.companyTitle}>{item.company}</h1>
          <h2 className={classes.jobTitle}>{item.jobTitle}</h2>
        </TimelineContent>
      </TimelineItem>
    ));
  };

  return (
    <TimelineContainer
      classes={{
        root: classes.timelineContainerRoot,
      }}
      position="alternate"
    >
      {renderTimelineItems()}
    </TimelineContainer>
  );
};

export default Timeline;
