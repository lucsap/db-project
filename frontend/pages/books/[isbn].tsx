import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../components/Modal/modal";

interface Livro {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  estado_conservacao: string;
  localizacao_fisica: string;
  descricao: string;
  data_aquisicao: string;
}

export default function LivroPage() {
  const router = useRouter();
  const { isbn } = router.query;
  const [livro, setLivro] = useState<Livro | null>(null);

  const bookRequest = async () => {
    const token = localStorage.getItem("@token");
    const response = await fetch(`http://localhost:3001/livros/${isbn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setLivro(data);
  };

  useEffect(() => {
    if (isbn) {
      bookRequest();
    }
  }, [isbn]);

  const openModal = (livro: Livro) => {
    setLivro(livro);
  };

  const closeModal = () => {
    setLivro(null);
    router.back()
  };

  if (!livro) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div
        onClick={openModal}
      />
      {livro && (
        <Modal
          isbn={livro.isbn}
          isOpen={true}
          onClose={closeModal}
          titulo={livro.titulo}
          categoria={livro.categoria}
          autor={livro.autor}
          estado_conservacao={livro.estado_conservacao}
          localizacao_fisica={livro.localizacao_fisica}
          descricao={livro.descricao}
          data_aquisicao={livro.data_aquisicao}
          image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41USfMS%2BjaL.jpg&f=1&nofb=1&ipt=218ae8af391522cd0cb67ecd6dc2e6d6de1c83f18f865fb897fb0e416379000a&ipo=images'}
        />
      )}
    </div>
  );
}
