import styles from './styles.module.css';

import React from 'react';

const Modal = ({ isOpen, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={onClose}>X</button>
        
          <div className={styles.modalContainer}>
              <img className={styles.modalImage} src={props.image} alt="" />
              <div className={styles.modalText}>
                <p className={styles.title}>{props.titulo}</p>
                <p className={styles.subTitle}>{props.categoria}</p>
                <p className={styles.subTitle}>{props.autor}</p>
                <p>{props.editora}</p>
                <p>{props.ano}</p>
                <p>{props.estado_conservacao}</p>
                <p>{props.localizacao_fisica}</p>
                <p>{props.isbn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
