import React, {useEffect, useState} from 'react';
import Layout from './Layout/layout';
import styles from './styles.module.css';
import Books from '../components/Books/books'
import Materials from '../components/Materials/materials'
import Modal from '../components/Modal/modal';

export default function Return() {

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


    //pegar livros e materiais do back que estejam emprestados
    //temporário
    const books = [
        {
            "title": "Poemas de Amor",
            "author": "Vinicius de Moraes",
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
    const type = 'livros'
    // const type = 'materiais'

    const sendReq = () => {
        //Enviar pro back aqui

        console.log(livro)
        console.log(material)
    }

    return (
        <Layout>
        <div className={styles.personalBox}>
        <h3>Devolução de Livros e Materiais</h3>
        <h4>
            Olá! Aqui você pode devolver qualquer livro ou material que pegou emprestado.
            </h4>
            <h5>Você está vendo todos os {type} emprestados</h5>
        </div>
        {type === 'livros' ? (
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
            ) : (
            <ul className={styles.listContainer}>

                {materials.map((material, index) => (
                    <Materials key={index} category={material.category} description={material.description} image={material.image} onClick={() => setMaterial(material)} />
                ))}
            </ul>
        )}
        <div className={styles.btnReg}>
        <button className={styles.btnPrimary} onClick={() => sendReq()}>
                Devolver
        </button>
        </div>
        </Layout>
    )
}
