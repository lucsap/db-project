import Image from 'next/image'
import styles from '../styles.module.css'

interface MaterialsProps {
  category: string; 
  image: string;
  description: string;
  name: string;
  onClick: () => void;
}

export default function Materials({ ...props }: MaterialsProps) {
    return (
        <button className={styles.cardContainer} {...props}>
            <div className={styles.cardImg}>
                <Image src={props.image} alt="material" width={300} height={300}/>
            </div>
            <div className={styles.cardInfos}>
                <div className={styles.cardName}>{props.name}</div>
                <div className={styles.cardValue}>{props.description}</div>
            </div>
        </button>

    )
}
