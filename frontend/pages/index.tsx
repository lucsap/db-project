import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Logo from '../assets/logo.svg'
import { useRouter } from 'next/router';

export default function Landing() {
    const router = useRouter();

    const handleClickLogin = () => {
        router.push('/login');
    };

    const handleClickRegister = () => {
        router.push('/signup');
    }

    return (
        <section className={styles.welcomeScreen}>
            <Image src={Logo} alt="logo" className="welcomeLogo" />
            <div>
                <h1 className={styles.h1}>Sejam Bem Vindos</h1>
                <h2 className={styles.h2}>
                    Uma plataforma dedicada a ajudar bibliotecas a gerenciar seus itens e seus usuários.
                </h2>
            </div>
            <div className={styles.btnContainer}>
                <button onClick={handleClickLogin} className={styles.btnPrimary} >
                    Faça login
                </button>
                <div className={styles.ou}> Ou </div>
                <button onClick={handleClickRegister} className={styles.btnPrimary} >
                    Cadastre-se
                </button>
            </div>
        </section>
    );
}
