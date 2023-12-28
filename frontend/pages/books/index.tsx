import { useEffect, useState } from "react";
import Link from "next/link";
import Books from "../../components/Books/books";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { convertBufferToBase64 } from "../../utils/convertBufferToBase64";

interface Livro {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  estado_conservacao: string;
  localizacao_fisica: string;
  imagem_capa: string;
}

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("@token");
      const response = await fetch(`http://localhost:3001/livros`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setLivros(data);
    }
    fetchData();
  }, [])

  const userRole = () => {
    const userString = localStorage.getItem('@user');
    console.log(userString);
    if (userString) {
      const user = JSON.parse(userString);
      const roleId = user.role_id;
      console.log(roleId)

      // Verificar se é admin ou membro
      if (roleId !== 1) {
        return true
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <strong>Livros disponíveis!</strong>
      <ul className={styles.listContainer}>
        {livros.map((livro) => (
          <li key={livro.isbn}>
            <Link href={`/books/${livro.isbn}`} className={styles.link}>
              <Books
                title={livro.titulo}
                author={livro.autor}
                image={convertBufferToBase64(livro.imagem_capa)}
              />
            </Link>
          </li>
        ))}
      </ul>
      { userRole() ? (
      <button 
      className={styles.btnPrimary}
      onClick={() => router.push('/books/create')}
      > 
      Adicionar livros 
      </button>
      ) : (
      <></>
      )
      }
    </div>
  );
}
