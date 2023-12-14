import React from 'react';
import HomePage from './home';
import Login from './login';
import Register from './register';
import Borrow from './borrow';
import Return from './return';
import Search from './search';

const App: React.FC = () => {
  return (
    <>
      <HomePage />
      <Login />
      <Register />
      <Borrow />
      <Return />
      <Search />
    </>
  );
};

export default App;