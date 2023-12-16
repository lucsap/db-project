import styles from "./styles.module.css"
import Image from "next/image"
import Logo from '../../assets/logo-branca.svg'
import { useRouter } from 'next/router';
import { useState } from "react";
import PopUp from "../PopUp/pupup";

function Header() {
    const router = useRouter();
    const [stay, setStay] = useState(false);
    const [selected , setSelected] = useState('');

    const handleoption = () => {
        setStay(!stay);
    }

    const handleLogOut = () => {
        localStorage.removeItem("@token");
        router.push("/");
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer} >
                <Image onClick={()=>{setSelected(''),router.push('/home')}} src={Logo} alt="logo" />
            </div>
            <div className={styles.menuContainer}>
                <ul className={styles.menuList}>
                    <li className={selected == 'Livros'? styles.selected:''} onClick={()=>{setSelected('Livros'), router.push('/books')}}>Livros</li>
                    <li className={selected == 'Materiais'? styles.selected:''} onClick={()=>{setSelected('Materiais'),router.push('/materials')}}>Materiais</li>
                    <li className={selected == 'Emprestimos'? styles.selected:''} onClick={()=>{setSelected('Emprestimos'),router.push('/borrow')}}>Fazer emprestimo</li>
                </ul>
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
