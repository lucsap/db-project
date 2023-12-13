import React from 'react';
import Layout from './Layout/layout';
import HomePage from './home';
import Login from './login';
import Register from './register';

const App: React.FC = () => {
  return (
    <>
      {/* <Layout> */}
      <HomePage />
      <Login />
      <Register />
      {/* </Layout> */}
    </>
  );
};

export default App;