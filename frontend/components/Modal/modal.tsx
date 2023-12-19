import styles from "./styles.module.css";
import React from "react";

const Modal = ({ isOpen, onClose, sendReq, type, ...props }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<button className={styles.modalClose} onClick={onClose}>
					X
				</button>

				<div className={styles.modalContainer}>
              <img className={styles.modalImage} src={props.image} alt="capa do livro" />
              <div className={styles.modalText}>
                <p className={styles.title}>{props.titulo}</p>
                <p className={styles.subTitle}>{props.autor}</p>
                <p className={styles.subTitle}>Categoria: {props.categoria}</p>
                <p>Isbn: {props.isbn}</p>
                <p>Descrição: {props.descricao}</p>
                <p>Estado de conservação: {props.estado_conservacao}</p>
                <p>Localização Física: {props.localizacao_fisica}</p>
                <p>Data de aquisição: {props.data_aquisicao}</p>
					</div>
					{props.button == true ? (
						<div className={styles.btnReg}>
							<button onClick={sendReq} className={styles.btnPrimary}>
								Solicitar Empréstimo
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
