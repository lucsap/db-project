import * as React from "react";
import styles from './styles.module.css';

export default function Button({ name }: { name: string }) {

    return (
        <button className={styles.mainButton}>
            {name}
        </button>
    );
}