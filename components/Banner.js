

import styles from "@/styles/banner.module.scss";


const Banner = props => {
    const {
        word = "",
        date = ""
    } = props;

    return (
        <div className={styles.container}>
            <h1 className={styles.word}>
                {word}
            </h1>
            <div className={styles.date}>
                {date}
            </div>
        </div>
    )
}

export default Banner;