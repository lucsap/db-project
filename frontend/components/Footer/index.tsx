import styles from "./styles.module.css"

function Footer() {
    return (
        <footer className={styles.footerContainer + " " + styles.border}>
            <div className={styles.contentContainer}>
                <div className={styles.columnWrapper}>
                </div>
                <div className={styles.columnWrapper + " " + styles.rightSide}>
                </div>

            </div>
            <div className={styles.copyright}>
                © Grupo 1. Todos os Direitos Reservados.
            </div>
        </footer>
    )
}

export default Footer;
