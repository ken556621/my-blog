import React from "react";

import styles from "@/styles/home.module.scss";

const Home = props => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Ken Code
      </div>
      <div className={styles.subTitle}>
        Frontend Engineer, 我是誰？我在哪裡？
      </div>
    </div>
  );
}

export default Home;