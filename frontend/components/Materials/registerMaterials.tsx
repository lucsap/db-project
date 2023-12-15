import { useState } from 'react';
import styles from '../../pages/globals.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router';

export default function FormMaterials() {
    const router = useRouter();
    const notify = () => toast("Dados do materiais incorretos !")
    const notify2 = () => toast("Materiais cadastrado com sucesso !")
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacao_fisica, setLocalizacao_fisica] = useState('');
    const [estado_conservacao, setEstado_conservacao] = useState('');
    const [numero_serie, setNumero_serie] = useState('');


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            nome: nome,
            categoria: categoria,
            descricao: descricao,
            localizacao_fisica: localizacao_fisica,
            estado_conservacao: estado_conservacao,
            numero_serie: numero_serie,
        }
        try {
            const response = await fetch(`http://localhost:3001/materiais/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            notify2();
            router.push('/materials');
            console.log(response)
        } else {
            console.log('error')
            notify();
        
        }  
    }
        catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className={styles.formContainer}>
            <ToastContainer />
            <h4>Você está fazendo cadastro de: Materiais</h4>
            <form onSubmit={handleSubmit} className={styles.align}>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Descrição</label>
                        <input
                            onChange={(event) => setDescricao(event.target.value)}
                            className={styles.formInput}
                            name='nome'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Número de Série</label>
                        <input
                            onChange={(event) => setNumero_serie(event.target.value)}
                            className={styles.formInput}
                            name='serialNumber'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Localização Física</label>
                        <input
                            onChange={(event) => setLocalizacao_fisica(event.target.value)}
                            className={styles.formInput}
                            name='location'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Categoria</label>
                        <input
                            onChange={(event) => setCategoria(event.target.value)}
                            className={styles.formInput}
                            name='category'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Data de Aquisição</label>
                        <input
                            onChange={(event) => setNome(event.target.value)}
                            className={styles.formInput}
                            name='aquiDate'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Estado de Conservação</label>
                        <input
                            onChange={(event) => setEstado_conservacao(event.target.value)}
                            className={styles.formInput}
                            name='conservationState'
                        />
                    </div>
                </div>
                <div className={styles.btnReg}>
                <button type="submit" className={styles.btnPrimary} >
                Cadastrar
                </button>
            </div>
            </form>
        </div>
    );
}
