import FormBooks from '../../../components/Books/registerBook';
import styles from './index.module.css'; 

export default function RegisterBook() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Cadastro de Livro</h1>
      <div className={styles.formContainer}>
        <FormBooks />
      </div>
    </div>
  );
}
