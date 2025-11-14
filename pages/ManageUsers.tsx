
import React from 'react';
import { UserSubPage } from '../types';
import SalesPage from './user/SalesPage';
import ShippingPage from './user/ShippingPage';
import OrdersPage from './user/OrdersPage';
import UserListPage from './user/UserLIstPage';


interface ManageUsersProps {
    activeSubPage: UserSubPage;
}

const ManageUsers: React.FC<ManageUsersProps> = ({ activeSubPage }) => {
    switch (activeSubPage) {
        case 'Penjualan':
            return <SalesPage />;
        case 'Pengiriman':
            return <ShippingPage />;
        case 'Pesanan':
            return <OrdersPage />;
        case 'Kelola Pengguna':
        default:
            return <UserListPage />;
    }
};

export default ManageUsers;
