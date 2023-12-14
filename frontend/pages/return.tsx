import React, {useEffect, useState} from 'react';
import Layout from './Layout/layout';
import styles from './styles.module.css';
import Books from '../components/Books/books'
import Materials from '../components/Materials/materials'

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

    const [livro, setBook] = useState({})
    const [material, setMaterial] = useState({})

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

                {livros.map((livro, index) => (
                    <Books 
                    key={index}
                    title={livro.titulo} 
                    author={livro.autor} 
                    image={'https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg'} onClick={() => setBook(livro)} />
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
