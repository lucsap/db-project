import styles from "./styles.module.css"
import Image from "next/image"
import Logo from '../../assets/logo-branca.svg'

function Header({ }) {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer} >
                <Image src={Logo} alt="logo" />
            </div>
        </header>
    )
}

export default Header
