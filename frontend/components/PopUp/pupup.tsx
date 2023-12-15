import styles from './styles.module.css';

import React from 'react';

const PopUp = ({ isOpen, onClose, children }: { children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.modalClose} onClick={onClose}>X</button>
                <div className={styles.modalContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopUp;