import React, {useState} from 'react';
import Layout from './Layout/layout';
import styles from './styles.module.css';
import Books from '../components/Books/books'
import Materials from '../components/Materials/materials'

export default function Borrow() {

    //temporário
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
    const type = 'livros'
    // const type = 'materiais'
    //////////////////////////////////////////////

    const [book, setBook] = useState({})
    const [material, setMaterial] = useState({})

    const sendReq = () => {
        //Enviar pro back aqui
        console.log(book)
        console.log(material)
    }

    return (
        <Layout>
        <div className={styles.personalBox}>
          <h3>Empréstimo de Livros e Materiais</h3>
          <h4>
            Olá estudante! Aqui você pode encontrar os livros e materiais que estão disponíveis na plataforma.
          </h4>
          <h5>Você está vendo todos os {type} disponíveis</h5>
        </div>
        {type === 'livros' ? (
            <ul className={styles.listContainer}>
                {books.map((book) => (
                    <Books title={book.title} author={book.author} image={book.image} onClick={() => setBook(book)} />
                ))}
            </ul>
            ) : (
            <ul className={styles.listContainer}>
                {materials.map((material) => (
                    <Materials category={material.category} description={material.description} image={material.image} onClick={() => setMaterial(material)} />
                ))}
            </ul>
        )}
        <div className={styles.btnReg}>
           <button className={styles.btnPrimary} onClick={() => sendReq()}>
                Solicitar Empréstimo
          </button>
        </div>
      </Layout>
    )
}