import styles from '../../pages/styles.module.css'

export default function BorrowMaterials({category, image, description, ...props}) {
    return (
        <button className={styles.cardContainer} {...props}>
            <div className={styles.cardImg}>
                <img src={image} alt="material" />
            </div>
            <div className={styles.cardInfos}>
                <div className={styles.cardName}>{category}</div>
                <div className={styles.cardValue}>{description}</div>
            </div>
        </button>

    )
}