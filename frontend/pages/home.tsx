import React from 'react';
import styles from './styles.module.css'
import { useRouter } from 'next/router';
import Layout from './Layout/layout';
import Books from '../components/Books/books';
import Materials from '../components/Materials/materials';

export default function HomePage() {
    const router = useRouter();
    const user = 'Fulano'

    //temporario
    const books = [
        {
            "title": "Poemas de Amor",
            "author": "Vinicius de Moraes",
            "image": "https://iili.io/Juxnkl9.jpg"
        },
        {
            "title": "Hoje eu mato o Ladeira",
            "author": "Ana Beatriz",
            "image": "https://iili.io/Juxnkl9.jpg"
        },
        {
            "title": "Aaaaa não sie mais nada",
            "author": "Desconhecido",
            "image": "https://iili.io/Juxnkl9.jpg"
        }
    ]

    const materials = [
        {
            "category": "Computadores",
            "description": "Pc Dell maluco",
            "image": "https://iili.io/Juxkncl.jpg"
        }
    ]

    return (
        <Layout>
            <div className={styles.personalBox}>
                <h3>Olá {user}</h3>
                <h4>
                    Esses são todos os livros e materiais que você tem no momento.
                </h4>
            </div>
            <div className={styles.dataContainer}>
                <div className={styles.infos}>
                    <h5>Seus livros</h5>
                    <ul className={styles.listContainer}>
                        {books.map((book) => (
                            <Books title={book.title} author={book.author} image={book.image} onClick={() => setBook(book)} />
                        ))}
                    </ul>
                </div>
                <div className={styles.infos}>
                    <h5>Seus materiais</h5>
                    <ul className={styles.listContainer}>
                        {materials.map((material) => (
                            <Materials category={material.category} description={material.description} image={material.image} onClick={() => setMaterial(material)} />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
