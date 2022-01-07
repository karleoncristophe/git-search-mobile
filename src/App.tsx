import React from 'react';
import UsersProvider from './context/UsersContext';
import Routes from './routes/Routes';

const App: React.FC = () => {
  return (
    <UsersProvider>
      <Routes />
    </UsersProvider>
  );
};

export default App;
