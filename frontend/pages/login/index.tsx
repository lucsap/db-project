import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {useState} from 'react';
import styles from './index.module.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);

    const notify = () => toast("Email ou Senha invalidos !")

    const router = useRouter();

    const handleSenhaChange = (event:any) => {
        setSenha(event.target.value);
    };

    const handleEmailChange = (event:any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event:any) => {
        if(isSubmiting){
            return;
        }
        event.preventDefault();
        
        const data = {
            email: email,
            senha: senha
        };

        try {
            setIsSubmiting(true);
            const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
            });
            

        if (response.ok) {
            const responseData = await response.json();

            const { access_token, user } = responseData;

            localStorage.setItem('@user', JSON.stringify(user));
            localStorage.setItem('@token', access_token);
            router.push('/home');
        }
        else {
            setIsSubmiting(false);
            notify();
        }
        } catch (error) {
            setIsSubmiting(false);
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsSubmiting(false);
              }, 2000)
        };

    };

    return (
        <div className={styles.loginScreen}>
            
            <div className={styles.screenSty}></div>
            <div className={styles.personalBox}>
                <ToastContainer />
                <h3>Bem vindo de volta!</h3>
                <h4>
                    Informe seus dados para logar na melhor plataforma de livros do Brasil!
                </h4>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
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
                    <div>
                        Não possui cadastro?
                        <Link href="/signup" className={styles.link}>Registre-se</Link>
                    </div>
                    <div className={styles.btnLogin}>
                        <button type="submit" className={styles.btnPrimary} disabled={isSubmiting} >
                        {isSubmiting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
