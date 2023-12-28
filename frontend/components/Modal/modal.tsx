import Image from "next/image";
import styles from "./styles.module.css";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sendReq: () => void;
  type: string;
  image: string;
  titulo: string;
  autor: string;
  categoria: string;
  isbn: string;
  descricao: string;
  estado_conservacao: string;
  localizacao_fisica: string;
  data_aquisicao: string;
  button: boolean;
}

export const Modal = ({ isOpen, onClose, sendReq, type, ...props }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<button className={styles.modalClose} onClick={onClose}>
					X
				</button>

				<div className={styles.modalContainer}>
              <Image className={styles.modalImage} src={props.image} alt="capa do livro" width={300} height={300}/>
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

