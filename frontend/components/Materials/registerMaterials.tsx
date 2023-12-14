import styles from '../../pages/styles.module.css'

export default function FormMaterials() {
    return (
        <div className={styles.formContainer}>
            <h4>Você está fazendo cadastro de: Materiais</h4>
            <div className={styles.align}>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Descrição</label>
                        <input
                            className={styles.formInput}
                            name='description'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Número de Série</label>
                        <input
                            className={styles.formInput}
                            name='serialNumber'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Localização Física</label>
                        <input
                            className={styles.formInput}
                            name='location'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Categoria</label>
                        <input
                            className={styles.formInput}
                            name='category'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Data de Aquisição</label>
                        <input
                            className={styles.formInput}
                            name='aquiDate'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Estado de Conservação</label>
                        <input
                            className={styles.formInput}
                            name='conservationState'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}