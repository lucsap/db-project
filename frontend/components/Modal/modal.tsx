import styles from './styles.module.css';
import React from 'react';

const Modal = ({ isOpen, onClose, type, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose}>X</button>
        
          <div className={styles.modalContainer}>
              <img className={styles.modalImage} src={props.image} alt="" />
              <div className={styles.modalText}>
                <p className={styles.title}>{props.titulo}</p>
                <p className={styles.subTitle}>{props.autor}</p>
                <p className={styles.subTitle}>Categoria: {props.categoria}</p>
                <p>Editora: {props.editora}</p>
                <p>Ano de Lançamento: {props.ano}</p>
                <p>Estado de conservação: {props.estado_conservacao}</p>
                <p>Localização Física: {props.localizacao_fisica}</p>
                <p>{props.isbn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
