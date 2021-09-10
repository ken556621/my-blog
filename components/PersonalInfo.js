import { makeStyles } from "@material-ui/core";

const usePersonalInfoStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "calc(100vh - 64px)",
    padding: "0px 24px"
  },
  avatar: {
    borderRadius: 8
  },
  introdution: {
    width: 500
  }
}));

const PersonalInfo = props => {
  const {} = props;

  const classes = usePersonalInfoStyles();

  return (
    <div className={classes.container}>
      <img className={classes.avatar} src="/avatar.jpg" />
      <div className={classes.introdution}>
        <h1>Hello</h1>
        <h2>I'm Ken Yu, a web frontend developer.</h2>
        <h2>
          A patient listener who is highly motivated to understand the reasons
          behind demands and optimized solutions for problems.
        </h2>
      </div>
    </div>
  );
};

export default PersonalInfo;
