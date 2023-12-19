import { useState } from 'react';
import styles from './styles.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router';

export default function FormBooks() {
    const router = useRouter();
    const notify = () => toast("Dados do livros incorretos !")
    const notify2 = () => toast("Livro cadastrado com sucesso !")
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacao_fisica, setLocalizacao_fisica] = useState('');
    const [estado_conservacao, setEstado_conservacao] = useState('');
    const [uri_capa, setUriCapa] = useState(''); 
    const [autor, setAutor] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            titulo: titulo,
            categoria: categoria,
            descricao: descricao,
            localizacao_fisica: localizacao_fisica,
            estado_conservacao: estado_conservacao,
            uri_capa_livro: uri_capa,
            autor: autor,
        }
        try {
            const token = localStorage.getItem('@token');
            const response = await fetch(`http://localhost:3001/livros/cadastro`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });
            console.log(data)
            if (response.status === 200 || response.status === 201) {
                notify2();
                router.push('/books');
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

    const estadosDeConservacao = [
      'Novo',
      'Bom',
      'Regular',
      'Ruim'
    ]

    return (
        <div className={styles.formContainer}>
            <ToastContainer />
            <h4>Você está fazendo cadastro de: Livros</h4>
            <form onSubmit={handleSubmit} className={styles.align}>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Título</label>
                        <input
                            onChange={(event) => setTitulo(event.target.value)}
                            className={styles.formInput}
                            name='title'
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Autor</label>
                        <input
                            onChange={(event) => setAutor(event.target.value)}
                            className={styles.formInput}
                            name='author'
                        />
                    </div>
                </div>
                <div className={styles.formGrup}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Descrição</label>
                        <input
                            onChange={(event) => setDescricao(event.target.value)}
                            className={styles.formInput}
                            name='description'
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
                <div className={styles.formInfos}>
                  <label className={styles.formLabel}>Estado de Conservação</label>
                  <select
                    onChange={(event) => setEstado_conservacao(event.target.value)}
                    className={styles.formInput}
                    name='conservationState'
                  >
                  {estadosDeConservacao.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
                <div className={styles.formInfos}>
                    <label className={styles.formLabel}>Uri Capa Livro</label>
                    <input
                        onChange={(event) => setUriCapa(event.target.value)}
                        className={styles.formInput}
                        name='location'
                    />
                </div>

                <div className={styles.formInfos}>
                    <label className={styles.formLabel}>Localização</label>
                    <input
                        onChange={(event) => setLocalizacao_fisica(event.target.value)}
                        className={styles.formInput}
                        name='location'
                    />
                </div>
                <div className={styles.btnReg}>
                    <button type="submit" onClick={handleSubmit} className={styles.btnPrimary} >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}

