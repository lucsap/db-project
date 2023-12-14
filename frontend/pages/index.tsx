import React from 'react';
import Landing from './landing';
import Login from './login';
import Register from './register';
import Borrow from './borrow';
import Return from './return';
import Search from './search';
import SignUp from './signup';
import HomePage from './home';

const App: React.FC = () => {
  return (
    <>
      <Landing />
      <Login />
      <Register />
      <Borrow />
      <Return />
      <Search />
      <SignUp />
      <HomePage />
    </>
  );
};

export default App;