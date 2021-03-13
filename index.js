
import Header from "@/components/Header";

import styles from "@/styles/home.module.scss";

const IndexPage = props => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>
          游肯扣的部落格 | Yu Ken Code Blog
        </h1>
        <div className={styles.subTitle}>
          原本體能教練轉職前端工程師隨便寫寫紀錄學習歷程，相信人沒辦法拒絕科技的迭代，而沒有人，科技也會變得毫無意義。喜歡跟朋友討論軟體開發和一言不合就寫扣的乾脆。
        </div>
      </div>
    </>
  );
}

export default IndexPage;