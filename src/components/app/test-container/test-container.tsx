import styles from './test-container.module.css';

export const TestContainer = () => (
    <div className={styles.root}>
        <div className={styles.div1}>
            <p>secondary_bg_color</p>

            <div className={styles.div2}>
                <p>bg_color</p>

                <p className={styles.p1}>text_color</p>
                <p className={styles.p2}>hint_color</p>
                <p className={styles.p3}>link_color</p>

                <div className={styles.div3}>
                    <p>button_color</p>
                </div>
                <div className={styles.div4}>
                    <p>header_bg_color</p>
                </div>
                <div className={styles.div5}>
                    <p>section_bg_color</p>
                </div>

                <p className={styles.p4}>subtitle_text_color</p>
                <p className={styles.p5}>destructive_text_color</p>
            </div>
        </div>
    </div>
);
