import React from 'react';
import HomePage from './home';
import Login from './login';
import Register from './register';
import Borrow from './borrow';
import Return from './return';
import Search from './search';
import SignUp from './signup';


const App: React.FC = () => {
  return (
    <>
      <HomePage />
      <Login />
      <Register />
      <Borrow />
      <Return />
      <Search />
      <SignUp />

    </>
  );
};

export default App;