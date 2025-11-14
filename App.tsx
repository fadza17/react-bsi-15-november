
import React, { useState } from 'react';
import Layout from './components/Layout';
import ManageUmkm from './pages/ManageUmkm';
import ManageFinance from './pages/ManageFinance';
import ManageProducts from './pages/ManageProducts';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import Bantuan from './pages/Bantuan';
import { Page, UserSubPage } from './types';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  console.log('App component rendering...');
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [activeSubPage, setActiveSubPage] = useState<UserSubPage>('Penjualan');

  const handleSetPage = (page: Page) => {
    setActivePage(page);
    // if we switch to a page that is not the user management, we can reset subpage or not.
    // for now, we leave it as it is.
  }

  const handleSetSubPage = (subPage: UserSubPage) => {
    setActivePage('Kelola Pengguna');
    setActiveSubPage(subPage);
  }


  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Kelola Produk':
        return <ManageProducts />;
      case 'Kelola Keuangan':
        return <ManageFinance />;
      case 'Kelola UMKM':
        return <ManageUmkm />;
      case 'Kelola Pengguna':
        return <ManageUsers activeSubPage={activeSubPage} />;
      case 'Bantuan':
        return <Bantuan />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ToastProvider>
      <Layout 
        activePage={activePage} 
        setActivePage={handleSetPage}
        activeSubPage={activeSubPage}
        setActiveSubPage={handleSetSubPage}
      >
        {renderPage()}
      </Layout>
    </ToastProvider>
  );
};

export default App;