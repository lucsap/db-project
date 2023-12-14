import styles from '../../pages/globals.module.css'

export default function FormBooks() {

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            titulo: event.target.titulo.value,
            categoria: event.target.categoria.value,
            descricao: event.target.descricao.value,
            localizacao_fisica: event.target.localizacao_fisica.value,
            estado_conservacao: event.target.estado_conservacao.value,
            autor: event.target.autor.value,
        }
        try {
            const response = await fetch(`http://localhost:3001/livros/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })}
    


    return (
        <div className={styles.formContainer}>
            <h4>Você está fazendo cadastro de: Livros</h4>
            <div className={styles.align}>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Título</label>
                        <input
                            className={styles.formInput}
                            name='title'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Autor</label>
                        <input
                            className={styles.formInput}
                            name='author'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Descrição</label>
                        <input
                            className={styles.formInput}
                            name='description'
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

