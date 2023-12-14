import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import { useRouter } from 'next/router';
import Books from '../../components/Books/books';
import Materials from '../../components/Materials/materials';
import Modal from '../../components/Modal/modal';

export default function HomePage() {

    interface Livro {
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: string;
        categoria: string;
        estado_conservacao: string;
        localizacao_fisica: string;
        image: string;
    }
    interface Materiais {
        id: string;
        category: string;
        description: string;
        image: string;
    }

    const [livro, setBook] = useState({})
    const [material, setMaterial] = useState({})
    const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null); // Livro selecionado para abrir o modal
    const [livros, setLivros] = useState<Livro[]>([]);
    const [materiais, setMateriais] = useState<Materiais[]>([]);

    const bookRequest = async () => {
        const token = localStorage.getItem('@token');
        const response = await fetch('http://localhost:3001/livros', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        
        setLivros(data.rows);
    };

    const materialRequest = async () => {
        const token = localStorage.getItem('@token');
        const response = await fetch('http://localhost:3001/materiais', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        
        setMateriais(data.rows);
    }
    
    useEffect(() => {
        bookRequest();
        materialRequest();
    }, []); 
    const openModal = (livro: Livro) => {
        setSelectedLivro(livro);
    };

    const closeModal = () => {
        setSelectedLivro(null);
    };


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
        <>
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
                {livros.map((livro) => (
                    <li key={livro.isbn}>
                        <Books
                            onClick={() => openModal(livro)} // Passa o livro específico ao abrir o modal
                            title={livro.titulo}
                            author={livro.autor}
                            image={'https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg'}
                        />
                        {selectedLivro && selectedLivro.isbn === livro.isbn && ( // Renderiza o modal apenas se o livro estiver selecionado
                            <Modal
                                isOpen={true}
                                onClose={closeModal}
                                titulo={selectedLivro.titulo}
                                categoria={selectedLivro.categoria}
                                autor={selectedLivro.autor}
                                editora={selectedLivro.editora}
                                ano={selectedLivro.ano}
                                estado_conservacao={selectedLivro.estado_conservacao}
                                localizacao_fisica={selectedLivro.localizacao_fisica}
                                isbn={selectedLivro.isbn}
                                image={'https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg'}
                            />
                        )}
                    </li>
                ))}
            </ul>
                </div>
                <div className={styles.infos}>
                    <h5>Seus materiais</h5>
                    <ul className={styles.listContainer}>
                        {materials.map((material, index) => (
                            <Materials 
                            key={index}
                            category={material.category} 
                            description={material.description} 
                            image={material.image} 
                            onClick={() => setMaterial(material)} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
