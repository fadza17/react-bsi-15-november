
import React, { useState } from 'react';
import { AppUserData } from '../../types';
import { SearchIcon, EditIcon, DeleteIcon, LeftArrowIcon, RightArrowIcon } from '../../components/icons/Icons';
import { useToast } from '../../context/ToastContext';
import AddAppUserModal from '../../components/modals/AddAppUser';

const initialUsers: AppUserData[] = [
    { id: 'U001', name: 'Mamat Guncop El Rumi', avatar: 'https://i.ibb.co/6Hk2c5v/man-avatar-scaled.jpg', email: 'mamat@gun.shop.com', totalOrders: 5, joinDate: '20/12/2025' },
    { id: 'U002', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/40?u=jane', email: 'jane.doe@example.com', totalOrders: 2, joinDate: '15/11/2025' },
    { id: 'U003', name: 'John Smith', avatar: 'https://i.pravatar.cc/40?u=john', email: 'john.smith@example.com', totalOrders: 8, joinDate: '01/10/2025' },
];

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<AppUserData[]>(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AppUserData | null>(null);
    const { addToast } = useToast();

    const handleOpenAddModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };
    
    const handleOpenEditModal = (user: AppUserData) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleSaveUser = (userData: Omit<AppUserData, 'id' | 'avatar' | 'totalOrders' | 'joinDate'>) => {
        if (editingUser) {
            // Update existing user
            setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...userData } : u));
            addToast('Pengguna berhasil diperbarui!', 'success');
        } else {
            // Add new user
            const newUser: AppUserData = {
                id: `U${String(users.length + 1).padStart(3, '0')}`,
                avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
                totalOrders: 0,
                joinDate: new Date().toLocaleDateString('id-ID'),
                ...userData
            };
            setUsers([...users, newUser]);
            addToast('Pengguna baru berhasil ditambahkan!', 'success');
        }
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            setUsers(users.filter(u => u.id !== userId));
            addToast('Pengguna berhasil dihapus!', 'error');
        }
    };

    return (
    <>
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Daftar Pengguna</h2>
            <div className="text-sm text-gray-500 mt-1 mb-6">
                <span className="text-gray-400">Dashboard</span> / Kelola Pengguna
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-4 w-4 text-gray-400" />
                        </span>
                        <input 
                            type="text" 
                            placeholder="Cari pengguna berdasarkan nama atau email" 
                            className="w-full md:w-80 pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                    </div>
                    <button 
                        onClick={handleOpenAddModal}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        Tambah Pengguna
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-3">ID Pengguna</th>
                                <th className="px-6 py-3">Nama Pengguna</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Total Pesanan</th>
                                <th className="px-6 py-3">Tanggal Bergabung</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map((user) => (
                                <tr key={user.id} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                        <span>{user.name}</span>
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 text-center">{user.totalOrders}</td>
                                    <td className="px-6 py-4">{user.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => handleOpenEditModal(user)} className="text-gray-400 hover:text-green-500"><EditIcon className="w-5 h-5"/></button>
                                            <button onClick={() => handleDeleteUser(user.id)} className="text-gray-400 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                    <p>1-5 of 29</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                            <LeftArrowIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-md bg-orange-400 text-white">
                            <RightArrowIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <AddAppUserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveUser}
            existingUser={editingUser}
        />
    </>
    )
}

export default UserListPage;