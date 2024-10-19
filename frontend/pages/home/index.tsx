import React, { useEffect, useState } from 'react';
import styles from './index.module.css'
import Books from '../../components/Books/books';
import Materials from '../../components/Materials/materials';
import { Modal } from '../../components/Modal/modal';
import { convertBufferToBase64 } from '../../utils/convertBufferToBase64';
import Link from 'next/link';


export default function HomePage() {

    const [user, setUser] = useState({}); // Usuário logado
    const [selectedMaterial, setSelectedMaterial] = useState(null); // Material selecionado para abrir o modal
    const [selectedLivro, setSelectedLivro] = useState(null); // Livro selecionado para abrir o modal
    const [livros, setLivros] = useState([]);  // Lista de livros
    const [materiais, setMateriais] = useState([]); // Lista de materiais

    useEffect(() => {
      const token = localStorage.getItem('@token');  // Pega o token do usuário logado
      async function bookRequest(){ // Requisição dos livros
          const response = await fetch('http://localhost:3001/livros', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          console.log(data)
          setLivros(data);
      };
      async function materialRequest(){ // Requisição dos materiais
          const response = await fetch('http://localhost:3001/materiais', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setMateriais(data);
      }

      materialRequest();
      bookRequest();
    }, [])

    const openModal = (livro: any) => {
        setSelectedLivro(livro);
    };

    const closeModal = () => {
        setSelectedLivro(null);
    };


    const openMaterialModal = (material: any) => {
        setSelectedMaterial(material);
    };

    const closeMaterialModal = () => {
        setSelectedMaterial(null);
    };

    return (
      <>
            <div className={styles.personalBox}>
                <h3>Olá {user.nome}</h3>
                <h4>
                  Esses são os livros e materiais disponíveis no momento!
                </h4>
            </div>
            <div className={styles.dataContainer}>
                <div className={styles.infos}>
                    <h5>Livros</h5>
                    <ul className={styles.listContainer}>
                        {livros.map((livro) => (
                            <li key={livro}>
                              <Link href={`/books/${livro.isbn}`} className={styles.link}>
                                <Books
                                  title={livro.titulo}
                                  author={livro.autor}
                                  image={convertBufferToBase64(livro.imagem_capa)}
                                />
                              </Link>
                                {selectedLivro && selectedLivro.isbn === livro.isbn && ( // Renderiza o modal apenas se o livro estiver selecionado
                                    <Modal // Passa as informações do livro para o modal
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
                                        image={selectedLivro.image}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.infos}>
                    <h5>Materiais</h5>
                    <ul className={styles.listContainer}>
                        {materiais.map((material, index) => (
                            <Materials // Passa as informações do material para o componente
                                key={index}
                                category={material.nome}
                                description={material.descricao}
                                image={convertBufferToBase64(material.imagem)}
                                onClick={() => openMaterialModal(material)}
                            />
                        ))}
                        {selectedMaterial && (
                            <Modal  // Passa as informações do material para o modal
                                type='material'
                                isOpen={true}
                                onClose={closeMaterialModal}
                                titulo={selectedMaterial.nome}
                                descricao={selectedMaterial.descricao}
                                categoria={selectedMaterial.categoria}
                                estado_conservacao={selectedMaterial.estado_conservacao}
                                localizacao_fisica={selectedMaterial.localizacao_fisica}
                                isbn={selectedMaterial.numero_serie}
                                image={selectedMaterial.image}
                            />
                        )}
                    </ul>
                </div>
            </div>
            </>
    );
}
