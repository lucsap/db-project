import React from 'react';
import styles from './index.module.css';
import FormBooks from '../../components/Books/registerBook';
import FormMaterials from '../../components/Materials/registerMaterials';
import Layout from '../layout';

export default function Register() {
  const type = 'book'

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.personalBox}>
          <h3>Cadastro de Livros e Materiais</h3>
          <h4>
            Olá admin! Aqui você pode cadastrar os livros e materiais que serão disponibilizados na plataforma.
          </h4>
        </div>
        {type === 'books' ? (
          <FormBooks />
        ) : (
          <FormMaterials />
        )}
      </div>
    </Layout>
  );
};
