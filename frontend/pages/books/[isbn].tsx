import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "../../components/Modal/modal";
import { convertBufferToBase64 } from "../../utils/convertBufferToBase64";

interface Livro {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  estado_conservacao: string;
  localizacao_fisica: string;
  descricao: string;
  data_aquisicao: string;
  imagem_capa: string;
}

export default function LivroPage() {
  const router = useRouter();
  const { isbn } = router.query;
  const [livro, setLivro] = useState<Livro | null>(null);

  useEffect(() => { 
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
    bookRequest();
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
          image={convertBufferToBase64(livro.imagem_capa)}
        />
      )}
    </div>
  );
}
