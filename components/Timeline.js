import { DarkModeContext } from "@/context/darkModeContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { rpx } from "@/helper/devise";
import { useContext } from "react";

const useTimelineStyles = makeStyles((theme) => ({
  containerRoot: {
    margin: "75px auto 30px auto",
    maxWidth: rpx(980),
    padding: `0 ${rpx(18)}`,

    [theme.breakpoints.up("laptop")]: {
      margin: "130px auto",
      padding: `0 ${rpx(28)}`,
    },
  },
  item: {
    marginBottom: rpx(22),
    padding: 0,
  },
  companyTitle: {
    margin: 0,
    fontSize: rpx(24),
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  jobTitle: {
    margin: `${rpx(6)} 0 0 0`,
    fontSize: rpx(16),
    color: "#334155",
  },
  achievementList: {
    margin: `${rpx(12)} 0 0 0`,
    paddingLeft: rpx(16),
    fontSize: rpx(16),
    lineHeight: 1.6,
    color: "#334155",
    "& li": {
      marginBottom: rpx(3),
    },
  },
  itemDark: {},
  darkMode: {
    "& h1, & h2, & li": {
      color: theme.color.word.darkMode,
    },
  },
}));

const Timeline = () => {
  const classes = useTimelineStyles();
  const { isDarkMode } = useContext(DarkModeContext);

  const timelineSchema = [
    {
      company: "Vocus",
      lastTime: "Sep. 2023 - Present",
      jobTitle: "Full Stack Software Engineer",
      achievement: [
        "Designed and implemented AWS-based infrastructure using Application Load Balancer (ALB) and Auto Scaling Groups to eliminate single points of failure and support horizontal scaling.",
        "Migrated the email delivery workflow to an event-driven architecture using Amazon SQS and AWS Lambda, improving reliability during service outages.",
        "Designed and implemented a scalable mobile push notification system using Amazon EventBridge, SQS, Step Functions, and AWS Lambda, supporting immediate and delayed aggregated notifications.",
        "Designed and implemented an AI-based image fraud detection system using Amazon Rekognition and AWS Step Functions to identify scam content embedded in images via OCR and keyword matching.",
        "Improved CI/CD workflows by migrating frontend deployments from Jenkins to GitHub Actions, reducing infrastructure costs and enabling faster parallel deployments.",
      ],
    },
    {
      company: "AmazingTalker",
      lastTime: "2019 - 2022",
      jobTitle: "Frontend Engineer",
      achievement: [
        "Built and maintained responsive web applications using Vue/React and Nuxt.js/Next.js across high-traffic B2C and B2B products, improving performance, SEO, and internationalization support.",
      ],
    },
    {
      company: "Vocus",
      lastTime: "2019 - 2022",
      jobTitle: "Frontend Engineer",
      achievement: [
        "Built and maintained responsive web applications using Vue/React and Nuxt.js/Next.js across high-traffic B2C and B2B products, improving performance, SEO, and internationalization support.",
      ],
    },
    {
      company: "CloudMile",
      lastTime: "2019 - 2022",
      jobTitle: "Frontend Engineer",
      achievement: [
        "Built and maintained responsive web applications using Vue/React and Nuxt.js/Next.js across high-traffic B2C and B2B products, improving performance, SEO, and internationalization support.",
      ],
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
    },
    {
      company: "National Taiwan Normal University",
      jobTitle: "Student",
      achievement: ["Department of Geography"],
      lastTime: "Nov. 2021 - Now",
    },
  ];

  const renderTimelineItems = () => {
    return timelineSchema.map((item) => (
      <div
        key={`${item.company}-${item.jobTitle}`}
        className={clsx(classes.item, {
          [classes.itemDark]: isDarkMode,
          [classes.darkMode]: isDarkMode,
        })}
      >
        <h1 className={classes.companyTitle}>{item.company}</h1>
        <h2 className={classes.jobTitle}>{item.jobTitle}</h2>
        {item.achievement?.length ? (
          <ul className={classes.achievementList}>
            {item.achievement.map((line, index) => (
              <li key={`${item.company}-${index}`}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ));
  };

  return <div className={classes.containerRoot}>{renderTimelineItems()}</div>;
};

export default Timeline;
