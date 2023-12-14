import { useState } from 'react';
import styles from './styles.module.css';
import Books from '../../components/Books/books'
import Materials from '../../components/Materials/materials'

export default function Search() {
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

    const [isSearch, setIsSearch] = useState(false)
    const sendReq = () => {
        //Enviar pro back aqui
        setIsSearch(true)
    }

    return (
        <>
            <div className={styles.personalBox}>
                <h3>Pesquisa de Livros e Materiais</h3>
                <h4>
                    Olá estudante! Aqui você pode pesquisar os livros e materiais que estão disponíveis na plataforma.
                </h4>
            </div>
            <input className={styles.formInput} name='search'/>
            <div className={styles.btnReg}>
                <button className={styles.btnPrimary} onClick={() => sendReq()}>
                    Pesquisar
                </button>
            </div>
            {isSearch === true ? (
                <>
                    {type === 'livros' ? (
                    <ul className={styles.listContainer}>
                        {books.map((book) => (
                            <Books title={book.title} author={book.author} image={book.image} />
                        ))}
                    </ul>
                    ) : (
                    <ul className={styles.listContainer}>
                        {materials.map((material) => (
                            <Materials category={material.category} description={material.description} image={material.image} />
                        ))}
                    </ul>
                )}
                </>
            ) : (
                <>
                    <h5>Nenhum resultado encontrado</h5>
                </>
            )}
        </>
    )
}
