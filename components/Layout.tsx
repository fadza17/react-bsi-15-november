import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Page, UserSubPage } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
  activeSubPage: UserSubPage;
  setActiveSubPage: (subPage: UserSubPage) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, activeSubPage, setActiveSubPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden"
        ></div>
      )}

      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        activeSubPage={activeSubPage} 
        setActiveSubPage={setActiveSubPage}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;