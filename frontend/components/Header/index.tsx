import styles from "./styles.module.css"

function Header({ }) {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.logosContainer} >
                {/* <img src={LogoGuerra} />
                <img src={LogoBB} /> */}
            </div>
        </header>
    )
}

export default Header
