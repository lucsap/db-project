import React from 'react';
import Layout from './Layout/layout';
import HomePage from './home';
import Login from './login';
import Register from './register';
import Borrow from './borrow';

const App: React.FC = () => {
  return (
    <>
      {/* <Layout> */}
      <HomePage />
      <Login />
      <Register />
      <Borrow />
      {/* </Layout> */}
    </>
  );
};

export default App;