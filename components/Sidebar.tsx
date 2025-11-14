import React, { useState, useEffect } from 'react';
import { Page, UserSubPage } from '../types';
import { ChevronDownIcon } from './icons/Icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  activeSubPage: UserSubPage;
  setActiveSubPage: (subPage: UserSubPage) => void;
  isSidebarOpen: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  isExpanded?: boolean;
  isSidebarOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, children, isExpanded, isSidebarOpen }) => {
  const hasChildren = !!children;
  
  const baseClasses = "flex items-center px-6 py-3 text-white cursor-pointer transition-colors duration-200 relative";
  const activeClasses = "bg-teal-700";
  const hoverClasses = "hover:bg-teal-700";
  
  return (
    <div>
        <div 
            className={`${baseClasses} ${isActive ? activeClasses : ''} ${!isActive ? hoverClasses : ''}`}
            onClick={onClick}
        >
            {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-orange-400 rounded-r-full"></div>}
            {icon}
            <span className={`mx-4 font-medium transition-opacity duration-300 ${!isSidebarOpen && 'lg:hidden'}`}>{label}</span>
            {hasChildren && <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${!isSidebarOpen && 'lg:hidden'}`} />}
        </div>
        {hasChildren && isExpanded && isSidebarOpen && (
            <div className="bg-teal-800/50">
                {children}
            </div>
        )}
    </div>
  );
};

const SubNavItem: React.FC<{label: string; isActive: boolean; onClick: () => void;}> = ({ label, isActive, onClick }) => {
    const baseClasses = "flex items-center pl-16 pr-6 py-2 text-sm text-white cursor-pointer transition-colors duration-200";
    const activeClasses = "bg-teal-700 font-semibold";
    const hoverClasses = "hover:bg-teal-700";

    return (
        <div className={`${baseClasses} ${isActive ? activeClasses : hoverClasses}`} onClick={onClick}>
            {label}
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, activeSubPage, setActiveSubPage, isSidebarOpen }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(activePage === 'Kelola Pengguna');
    
    useEffect(() => {
        if(activePage === 'Kelola Pengguna') {
            setIsUserMenuOpen(true);
        } else if (isSidebarOpen) {
            setIsUserMenuOpen(false);
        }
    }, [activePage, isSidebarOpen]);

    useEffect(() => {
      if (!isSidebarOpen) {
        setIsUserMenuOpen(false);
      }
    }, [isSidebarOpen])

  const sidebarBaseClasses = "bg-teal-600 flex flex-col transition-all duration-300 ease-in-out";
  const sidebarResponsiveClasses = "fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0";
  const sidebarStateClasses = isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0";


  return (
    <div className={`${sidebarBaseClasses} ${sidebarResponsiveClasses} ${sidebarStateClasses}`}>
      <div className="flex items-center justify-center h-20 border-b border-teal-700 px-4">
        <img src="/assets/img/iconbsi.svg" alt="BSI Logo" className="h-16 w-16 flex-shrink-0" />
      </div>
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
        <NavItem isSidebarOpen={isSidebarOpen} icon={<img src="/assets/img/dashbor.svg" alt="Dashboard" className="h-6 w-6 flex-shrink-0" />} label="Dashboard" isActive={activePage === 'Dashboard'} onClick={() => setActivePage('Dashboard')} />
        <NavItem isSidebarOpen={isSidebarOpen} icon={<img src="/assets/img/balok.svg" alt="Kelola Produk" className="h-6 w-6 flex-shrink-0" />} label="Kelola Produk" isActive={activePage === 'Kelola Produk'} onClick={() => setActivePage('Kelola Produk')} />
        <NavItem isSidebarOpen={isSidebarOpen} icon={<img src="/assets/img/uang.svg" alt="Kelola Keuangan" className="h-6 w-6 flex-shrink-0" />} label="Kelola Keuangan" isActive={activePage === 'Kelola Keuangan'} onClick={() => setActivePage('Kelola Keuangan')} />
        <NavItem isSidebarOpen={isSidebarOpen} icon={<img src="/assets/img/home.svg" alt="Kelola UMKM" className="h-6 w-6 flex-shrink-0" />} label="Kelola UMKM" isActive={activePage === 'Kelola UMKM'} onClick={() => setActivePage('Kelola UMKM')} />
        <NavItem 
            isSidebarOpen={isSidebarOpen}
            icon={<img src="/assets/img/user.svg" alt="Kelola Pengguna" className="h-6 w-6 flex-shrink-0" />} 
            label="Kelola Pengguna" 
            isActive={activePage === 'Kelola Pengguna'} 
            onClick={() => {
                if(activePage !== 'Kelola Pengguna') {
                    setActivePage('Kelola Pengguna');
                    setActiveSubPage('Kelola Pengguna');
                }
                if (isSidebarOpen) {
                    setIsUserMenuOpen(!isUserMenuOpen);
                }
            }}
            isExpanded={isUserMenuOpen}
        >
            <SubNavItem label="Daftar Pengguna" isActive={activeSubPage === 'Kelola Pengguna'} onClick={() => setActiveSubPage('Kelola Pengguna')} />
            <SubNavItem label="Pesanan" isActive={activeSubPage === 'Pesanan'} onClick={() => setActiveSubPage('Pesanan')} />
            <SubNavItem label="Pengiriman" isActive={activeSubPage === 'Pengiriman'} onClick={() => setActiveSubPage('Pengiriman')} />
            <SubNavItem label="Penjualan" isActive={activeSubPage === 'Penjualan'} onClick={() => setActiveSubPage('Penjualan')} />
        </NavItem>
        <NavItem isSidebarOpen={isSidebarOpen} icon={<img src="/assets/img/help.svg" alt="Bantuan" className="h-6 w-6 flex-shrink-0" />} label="Bantuan" isActive={activePage === 'Bantuan'} onClick={() => setActivePage('Bantuan')} />
      </nav>
    </div>
  );
};

export default Sidebar;