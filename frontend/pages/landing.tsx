import React from 'react';
import styles from './styles.module.css'
import Image from 'next/image';
import Logo from '../assets/logo.svg'
import { useRouter } from 'next/router';

export default function Landing() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    };

    return (
        <section className={styles.welcomeScreen}>
            <Image src={Logo} alt="logo" className="welcomeLogo" />
            <div>
                <h1 className={styles.h1}>Bem Vindos brancos retintos!</h1>
                <h2 className={styles.h2}>
                    Uma plataforma dedicada aos amantes de leitura
                </h2>
            </div>
            <div className={styles.btnContainer}>
                <button onClick={handleClick} className={styles.btnPrimary}
                >
                    sou admin
                </button>
                <button onClick={handleClick} className={styles.btnPrimary}
                >
                    sou estudante
                </button>
            </div>
        </section>
    );
}
