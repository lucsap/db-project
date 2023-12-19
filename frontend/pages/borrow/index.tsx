import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Books from "../../components/Books/books";
import Materials from "../../components/Materials/materials";
import Modal from "../../components/Modal/modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Borrow() {
	interface Livro {
		isbn: string;
		titulo: string;
		autor: string;
		editora: string;
		ano: string;
		categoria: string;
		estado_conservacao: string;
		localizacao_fisica: string;
		image: string;
	}
	interface Materiais {
		id: string;
		category: string;
		description: string;
		image: string;
	}

	const notify = () => toast("Item solicitado com sucesso !");
	const notifyError = () => toast("Erro ao solicitar item !");
	const [req, setReq] = useState([]); // Requisições do usuário [temporário
	const [livros, setLivros] = useState<Livro[]>([]);
	const [materiais, setMateriais] = useState<Materiais[]>([]);
	const [tipo, setTipo] = useState("livros"); // 'livros' ou 'materiais' [temporário
	const [user, setUser] = useState({}); // Usuário logado
	const [selectedMaterial, setSelectedMaterial] = useState<Materiais | null>(
		null
	);
	const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null); // Livro selecionado para abrir o modal

	const openModal = (livro: Livro) => {
		setSelectedLivro(livro);
	};

	const closeModal = () => {
		setSelectedLivro(null);
	};

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
		console.log(data);
		setLivros(data);
	};
	const materialRequest = async () => {
		const token = localStorage.getItem("@token");
		const response = await fetch("http://localhost:3001/materiais", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		setMateriais(data);
	};

	const sendReq = async (event: any) => {
		let id_item;
		if (tipo === "livros") {
			id_item = selectedLivro?.isbn;
		} else {
			id_item = selectedMaterial?.id;
		}

		event.preventDefault();
		const data = {
			id_usuario: user.id,
			id_item: id_item,
		};

		try {
			const token = localStorage.getItem("@token");
			const response = await fetch("http://localhost:3001/emprestimo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				notify();
				if (tipo === "livros" && selectedLivro) {
					const updatedLivros = livros.filter(
						(livro) => livro.isbn !== selectedLivro.isbn
					);
					setLivros(updatedLivros);
				}
				if (tipo === "materiais" && selectedMaterial) {
					const updatedMateriais = materiais.filter(
						(material) => material.id !== selectedMaterial.id
					);
					setMateriais(updatedMateriais);
				}
			}else{
				notifyError();
			}
		} catch (error) {

				console.log(error);
			
		}
	};

	const emprestimoReq = async () =>{
		const token = localStorage.getItem("@token");
		const response = await fetch("http://localhost:3001/emprestimo", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		console.log(data);
		setReq(data)
	}
	

	useEffect(() => {
		materialRequest();
		bookRequest();
		emprestimoReq();
		if (typeof window !== "undefined") {
			const userData = localStorage.getItem("@user");
			setUser(userData ? JSON.parse(userData) : {});
		}
	}, []);

	const handleTipoChange = (event: any) => {
		setTipo(event.target.value);
	};

	//temporário
	const books = [
		{
			title: "Poemas de Amor",
			author: "Vinicius de Moraes",
			image: "https://iili.io/Juxnkl9.jpg",
		},
		{
			title: "Hoje eu mato o Ladeira",
			author: "Ana Beatriz",
			image: "https://iili.io/Juxnkl9.jpg",
		},
		{
			title: "Aaaaa não sie mais nada",
			author: "Desconhecido",
			image: "https://iili.io/Juxnkl9.jpg",
		},
	];

	const materials = [
		{
			category: "Computadores",
			description: "Pc Dell maluco",
			image: "https://iili.io/Juxkncl.jpg",
		},
	];
	const type = "livros";
	// const type = 'materiais'

	const openMaterialModal = (material: Materiais) => {
		setSelectedMaterial(material);
	};

	const closeMaterialModal = () => {
		setSelectedMaterial(null);
	};

	console.log(tipo);
	return (
		<div className={styles.pageContainer}>
			<ToastContainer />
			<div className={styles.personalBox}>
				<h3>Empréstimo de Livros e Materiais</h3>
				<h4>
					Olá estudante! Aqui você pode encontrar os livros e materiais que
					estão disponíveis na plataforma.
				</h4>

				<div>
					<input
						type="radio"
						id="Livros"
						name="tipo"
						value="livros"
						checked={tipo === "livros"}
						onChange={handleTipoChange}
					/>
					<label>Livros</label>
					<br />
					<input
						type="radio"
						id="Materiai"
						name="tipo"
						value="materiais"
						checked={tipo === "materiais"}
						onChange={handleTipoChange}
					/>
					<label>Materiais Didáticos</label>
				</div>

				<h5>Você está vendo todos os {tipo} disponíveis</h5>
			</div>
			{tipo === "livros" ? (
				<ul className={styles.listContainer}>
					{livros.map((livro) => (
						<li key={livro.isbn}>
							<Books
								onClick={() => openModal(livro)} // Passa o livro específico ao abrir o modal
								title={livro.titulo}
								author={livro.autor}
								image={
									"https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg"
								}
							/>
							{selectedLivro &&
								selectedLivro.isbn === livro.isbn && ( // Renderiza o modal apenas se o livro estiver selecionado
									<>
										<Modal
											isOpen={true}
											onClose={closeModal}
											titulo={selectedLivro.titulo}
											categoria={selectedLivro.categoria}
											autor={selectedLivro.autor}
											editora={selectedLivro.editora}
											ano={selectedLivro.ano}
											estado_conservacao={selectedLivro.estado_conservacao}
											localizacao_fisica={selectedLivro.localizacao_fisica}
											isbn={selectedLivro.isbn}
											image={
												"https://cdn.awsli.com.br/2500x2500/2362/2362735/produto/221557798/81uvv7s9abl-axu125ebuo.jpg"
											}
											button={true}
											sendReq={sendReq}
										/>
									</>
								)}
						</li>
					))}
				</ul>
			) : (
				<ul className={styles.listContainer}>
					{materiais.map((material, index) => (
						<Materials
							key={index}
							category={material.nome}
							description={material.descricao}
							image={"https://iili.io/Juxkncl.jpg"}
							onClick={() => openMaterialModal(material)}
						/>
					))}
					{selectedMaterial && (
						<Modal
							type="material"
							isOpen={true}
							onClose={closeMaterialModal}
							titulo={selectedMaterial.nome}
							descricao={selectedMaterial.descricao}
							categoria={selectedMaterial.categoria}
							estado_conservacao={selectedMaterial.estado_conservacao}
							localizacao_fisica={selectedMaterial.localizacao_fisica}
							isbn={selectedMaterial.numero_serie}
							image={"https://iili.io/Juxkncl.jpg"}
							button={true}
							sendReq={sendReq}
						/>
					)}
				</ul>
			)}
		</div>
	);
}
