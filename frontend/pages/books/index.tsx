import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Books from '../../components/Books/books';
import Modal from '../../components/Modal/modal';
import Layout from '../layout'

export default function Livros() {
    interface Livro {
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: string;
        categoria: string;
        estado_conservacao: string;
        localizacao_fisica: string;
    }
    const [livros, setLivros] = useState<Livro[]>([]);
    const [selectedLivro, setSelectedLivro] = useState<Livro[]>([]);

    const bookRequest = async () => {
        const token = localStorage.getItem('@token');
        const response = await fetch('http://localhost:3001/livros', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        setLivros(data);
    };

    useEffect(() => {
        bookRequest();
    }, []);

    const openModal = (livro: Livro) => {
        setSelectedLivro(livro);
    };

    const closeModal = () => {
        setSelectedLivro([]);
    };

    return (
        <Layout>
            <ul className={styles.listContainer}>
                {livros.map((livro: Livro) => (
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
        </Layout>
    );
};
