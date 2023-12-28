import Image from "next/image";
import styles from "../styles.module.css";

interface BooksProps {
  title: string,
  author: string,
  image: string | Buffer | undefined,
}

export default function Books({ title, image, author }: BooksProps) {

  return (
    <button className={styles.cardContainer}>
      <div className={styles.cardImg}>
        <Image src={image} alt="livro" width={300} height={300}/>
      </div>
      <div className={styles.cardInfos}>
        <div className={styles.cardName}>{title}</div>
        <div className={styles.cardValue}>{author}</div>
      </div>
    </button>
  );
}
