import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

import dayjs from "dayjs";

const useFooterStyles = makeStyles(theme => ({
  footerWrapper: {
    padding: theme.spacing(4),
    textAlign: "center",
    backgroundColor: "#343a40",
    color: "#fff"
  },
  img: {
    width: 20,
    height: 28
  }
}));

const Footer = () => {
  const classes = useFooterStyles();

  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="原本體能教練轉職前端工程師，相信人沒辦法拒絕科技的迭代，而沒有人，科技也會變得毫無意義。喜歡跟朋友討論軟體開發和一言不合就寫扣的乾脆。"
      >
        <marquee direction="right" scrolldelay="60">
          <img
            src="https://akstatic.streetvoice.com/asset/images/sv-cat.gif"
            className={classes.img}
          />
        </marquee>
      </Tooltip>
      <div className={classes.footerWrapper}>
        {`Copyright © ${dayjs().year()} Yu Ken Code`}
      </div>
    </div>
  );
};

export default Footer;
