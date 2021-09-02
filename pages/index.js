import Header from "@/components/Header";

import { makeStyles } from "@material-ui/core";

const useIndexPageStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: 30,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 14px 0 rgb(137 174 255 / 20%)",
    borderRadius: 8
  },
  title: {
    margin: "0px 0px 20px 0px",
    padding: 0,
    fontSize: "1.5em",
    fontSize: 26,
    color: "#0a2f5c"
  },
  subTitle: {
    margin: 0,
    padding: 0,
    color: "#0a2f5c"
  }
}));

const IndexPage = props => {
  const classes = useIndexPageStyles();

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>游肯扣的部落格 | Yu Ken Code Blog</h1>
        <div className={classes.subTitle}>
          原本體能教練轉職前端工程師隨便寫寫紀錄學習歷程，相信人沒辦法拒絕科技的迭代，而沒有人，科技也會變得毫無意義。喜歡跟朋友討論軟體開發和一言不合就寫扣的乾脆。
        </div>
      </div>
    </>
  );
};

export default IndexPage;
