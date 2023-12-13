import styles from './styles.module.css'

export default function Login() {

    return (
        <div className={styles.loginScreen}>
            <div className={styles.screenSty}></div>
            <div className={styles.personalBox}>
                <h3>Bem vindo de volta!</h3>
                <h4>
                    Informe seus dados para logar na melhor plataforma de livros do Brasil!
                </h4>

                <div className={styles.formContainer}>
                    <div className={styles.formGrup}>
                        <div className={styles.formInfos}>
                            <label className={styles.formLabel}>Email</label>
                            <input
                                className={styles.formInput}
                                name='email'
                            />
                        </div>
                        <div className={styles.formInfos}>
                            <label className={styles.formLabel}>Senha</label>
                            <input
                                className={styles.formInput}
                                type='password'
                                name='senha'
                            />
                        </div>
                    </div>
                    <div className={styles.btnLogin}>
                        <button className={styles.btnPrimary} >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}