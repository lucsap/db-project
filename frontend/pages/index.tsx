import React, { useEffect, useState } from 'react';

// Pages
import Landing from './landing';
import Login from './login';
import Register from './register';
import Borrow from './borrow';
import Return from './return';
import Search from './search';
import SignUp from './signup';
import HomePage from './home';

// Components
import Layout from './Layout/layout';

// Utils
import { userContext } from '../utils/userContext';
import { booksContext } from '../utils/booksContext';


function App() {
  const [user, setUser] = useState();
  const [books, setBooks] = useState([]);
  const valueUser = {user, setUser};
  const valueBooks = {books, setBooks};
  const token = localStorage.getItem('@token');

  useEffect(() => {
    // PEGAR ID DO USUARIO E COM ISSO PEGAR USER NO BACK E SETAR NO USERCONTEXT
    // PEGAR TODOS OS LIVROS E SETAR NO BOOKSCONTEXT
    // TESTE
    setUser({nome: 'Ana Beatriz', id: 1, email: 'ana@teste.com', sobrenome: 'Pontes'})
    // setBooks([
    //   { title: "Poemas de Amor", author: "Vinicius de Moraes", image: "https://iili.io/Juxnkl9.jpg"}, 
    //   { title: "Hoje eu mato o Ladeira", author: "Ana Beatriz", image: "https://iili.io/Juxnkl9.jpg"}, 
    //   { title: "Aaaaa não sie mais nada", author: "Desconhecido", image: "https://iili.io/Juxnkl9.jpg"}
    // ])
  }, []);

  let render;

  if(!token) {
    render = (
      <>
        <Landing />
        <Login />
        <SignUp />
      </>
    )
  }
  else {
    render = (
      <userContext.Provider value={valueUser}>
        {/* <booksContext.Provider value={valueBooks}> */}
          <Layout>
            <Register />
            <Borrow />
            <Return />
            <Search />
            <HomePage />
          </Layout>
        {/* </booksContext.Provider> */}
      </userContext.Provider>
    );
  }

  return render;
}

export default App;