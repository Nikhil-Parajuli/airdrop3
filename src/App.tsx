import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      {user ? <Dashboard /> : <Auth />}
    </Layout>
  );
}

export default App;