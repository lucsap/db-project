import { useEffect, useState } from "react";
import Link from "next/link";
import Books from "../../components/Books/books";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

interface Livro {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  estado_conservacao: string;
  localizacao_fisica: string;
}

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const router = useRouter();

  const bookRequest = async () => {
    const token = localStorage.getItem("@token");
    const response = await fetch("http://localhost:3001/livros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setLivros(data);
  };

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

  useEffect(() => {
    bookRequest();
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <strong>Livros disponíveis!</strong>
      <ul className={styles.listContainer}>
        {livros.map((livro: Livro) => (
          <li key={livro.isbn}>
            <Link href={`/books/${livro.isbn}`} className={styles.link}>
              <Books
                title={livro.titulo}
                author={livro.autor}
                image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41USfMS%2BjaL.jpg&f=1&nofb=1&ipt=218ae8af391522cd0cb67ecd6dc2e6d6de1c83f18f865fb897fb0e416379000a&ipo=images'}
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
