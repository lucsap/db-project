import styles from '../styles.module.css'

export default function Materials({category, image, description, ...props}) {
    return (
        <button className={styles.cardContainer} {...props}>
            <div className={styles.cardImg}>
                <img src={image} alt="material" />
            </div>
            <div className={styles.cardInfos}>
                <div className={styles.cardName}>{props.name}</div>
                <div className={styles.cardValue}>{description}</div>
            </div>
        </button>

    )
}
