import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Books from '../../components/Books/books'
import Materials from '../../components/Materials/materials'

export default function Search() {
    const [itens, setItens] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem("@token");
        const response = await fetch(`http://localhost:3001/livros/itens`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setItens(data);
      }
    }, [])

    const [isSearch, setIsSearch] = useState(false)
    const sendReq = () => {
        //Enviar pro back aqui
        setIsSearch(true)
    }

    return (
            <div className={styles.contentPage}>
                <div className={styles.personalBox}>
                    <h3>Pesquisa de Livros e Materiais</h3>
                    <h4>
                        Olá estudante! Aqui você pode pesquisar os livros e materiais que estão disponíveis na plataforma.
                    </h4>
                </div>
                <input className={styles.formInput} name='search' />
                <div className={styles.btnReg}>
                    <button className={styles.btnPrimary} onClick={() => sendReq()}>
                        Pesquisar
                    </button>
                </div>
                {isSearch === true ? (
                    <>
                        {type === 'livros' ? (
                            <ul className={styles.listContainer}>
                                {books.map(({book, index}: any) => (
                                    <Books key={index} title={book.title} author={book.author} image={book.image} />
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
            </div>
    )
}
