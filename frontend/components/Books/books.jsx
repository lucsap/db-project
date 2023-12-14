import styles from '../../pages/globals.module.css'

export default function Books({title, image, author, ...props}) {
    return (
        <button className={styles.cardContainer} {...props}>
            <div className={styles.cardImg}>
                <img src={image} alt="livro" />
            </div>
            <div className={styles.cardInfos}>
                <div className={styles.cardName}>{title}</div>
                <div className={styles.cardValue}>{author}</div>
            </div>
        </button>

    )
}
