import styles from "./styles.module.css"
import Image from "next/image"
import Logo from '../../assets/logo-branca.svg'
import { useRouter } from 'next/router';
import { useState } from "react";
import PopUp from "../PopUp/popup";

function Header({ }) {
    const router = useRouter();
    const [stay, setStay] = useState(false);

    const handleoption = () => {
        setStay(!stay);
    }

    const handleLogOut = () => {
        localStorage.removeItem("@token");
        router.push("/landing");
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer} >
                <Image src={Logo} alt="logo" />
            </div>
            <div className={styles.logoutContainer}>
                <button onClick={handleoption} className={styles.buttonLogOut}>Sair</button>
            </div>
            {stay && (
                <PopUp isOpen={true} onClose={() => setStay(false)}>
                    <div className={styles.buttonsWrapper}>
                        <button onClick={handleLogOut} className={styles.btnPrimary}>Sim, sair da minha conta</button>
                        <button onClick={handleoption} className={styles.outlineBtn}>Não, quero ficar</button>
                    </div>
                </PopUp>
            )}
        </header>
    )
}

export default Header
