import styles from "./styles.module.css"

function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.copyright}>
                © Grupo 1. Todos os Direitos Reservados.
            </div>
        </footer>
    )
}

export default Footer;
