import { useRouter } from 'next/router';
import styles from './index.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);

    const notify = () => toast("Dados invalidos !")

    const router = useRouter();

    const handleNameChange = (event: any) => {
        setNome(event.target.value);
    };

    const handleSobrenomeChange = (event: any) => {
        setSobrenome(event.target.value);
    };

    const handleSenhaChange = (event: any) => {
        setSenha(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        if (isSubmiting) {
            return;
        }
        event.preventDefault();

        const data = {
            email: email,
            senha: senha,
            nome: nome,
            sobrenome: sobrenome,
        };

        try {
            setIsSubmiting(true);
            const response = await fetch('http://localhost:3001/usuarios/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });


            if (response.ok) {
                console.log(response)
                router.push('/login');
            }
            else {
                setIsSubmiting(false);
                notify();
            }
        } catch (error) {
            setIsSubmiting(false);
            console.log(error);
        } 
    };

    return (
        <div className={styles.loginScreen}>

            <div className={styles.screenSty}></div>
            <div className={styles.personalBox}>
                <ToastContainer />
                <h3>Bem vindo!</h3>
                <h4>
                    Informe seus dados para se cadastrar na melhor plataforma de livros do Brasil!
                </h4>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Nome</label>
                        <input
                            id='nome'
                            className={styles.formInput}
                            name='nome'
                            placeholder='João'
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Sobrenome</label>
                        <input
                            id='sobrenome'
                            className={styles.formInput}
                            name='sobrenome'
                            placeholder='Silva'
                            onChange={handleSobrenomeChange}
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                            id='email'
                            className={styles.formInput}
                            name='email'
                            type='email'
                            placeholder='email@email.com'
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={styles.formInfos}>
                        <label className={styles.formLabel}>Senha</label>
                        <input
                            id='senha'
                            className={styles.formInput}
                            type='password'
                            name='senha'
                            placeholder='********'
                            onChange={handleSenhaChange}
                        />
                    </div>
                    <div className={styles.btnLogin}>
                        <button type="submit" className={styles.btnPrimary} disabled={isSubmiting} >
                            {isSubmiting ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
