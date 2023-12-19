import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Modal from '../../components/Modal/modal';
import Materials from '../../components/Materials/materials';

interface materialProps {
    id: number,
    nome: string,
    editora: string,
    numero_serie: number,
    categoria: string,
    estado_conservacao: string,
    localizacao_fisica: string,
}

export default function Materiais() {
    const [materiais, setMateriais] = useState<Material>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<Material>([]);

    const materialRequest = async () => {
        const token = localStorage.getItem('@token');
        const response = await fetch('http://localhost:3001/materiais', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        

        setMateriais(data);
    };
    
    useEffect(() => {
        materialRequest();
    }, []); 
    
    const openModal = (material: any) => {
        setSelectedMaterial(material);
    };

    const closeModal = () => {
        setSelectedMaterial([]);
    };

    return (
            <div className={styles.container}>
              <strong>Materiais disponíveis!</strong>
                <ul className={styles.listContainer}>
                    {materiais.map((material: Material) => (
                        <li key={material.id}>
                            <Materials
                                onClick={() => openModal(material)} // Passa o material específico ao abrir o modal
                                name={material.nome}
                                author={material.categoria}
                                image={'https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg'}
                            />
                            {selectedMaterial && selectedMaterial.id === material.id && ( // Renderiza o modal apenas se o material estiver selecionado
                                <Modal
                                    isOpen={true}
                                    onClose={closeModal}
                                    titulo={selectedMaterial.nome}
                                    categoria={selectedMaterial.categoria}
                                    autor={selectedMaterial.autor}
                                    editora={selectedMaterial.editora}
                                    ano={selectedMaterial.ano}
                                    estado_conservacao={selectedMaterial.estado_conservacao}
                                    localizacao_fisica={selectedMaterial.localizacao_fisica}
                                    image={'https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg'}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
    );
};
