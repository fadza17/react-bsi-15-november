
import React from 'react';
import { SearchIcon, EyeIcon, EditIcon, DeleteIcon, LeftArrowIcon, RightArrowIcon } from '../components/icons/Icons';
import { UmkmData } from '../types';

const mockUmkmData: UmkmData[] = [
    { id: 'C001', name: 'Basreng bakar by Hilni', totalProducts: 3, contact: '0819282910', balance: 120000, bank: 'Mandiri', accountNumber: '1020938091'},
    // Add more mock data if needed to test scrolling
];

const ManageUmkm: React.FC = () => {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Kelola UMKM</h2>
                <div className="text-sm text-gray-500 mt-1">
                    <span className="text-gray-400">Dashboard</span> / Kelola Pengguna
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-700">Pengguna UMKM</h3>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-4 w-4 text-gray-400" />
                        </span>
                        <input 
                            type="text" 
                            placeholder="Cari Pengguna" 
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                    </div>
                    <button className="bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-500 transition-colors">
                        Tambah Pengguna Baru
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3">ID UMKM</th>
                            <th className="px-6 py-3">UMKM</th>
                            <th className="px-6 py-3">Total Produk</th>
                            <th className="px-6 py-3">Kontak</th>
                            <th className="px-6 py-3">Saldo Saat Ini</th>
                            <th className="px-6 py-3">Bank</th>
                            <th className="px-6 py-3">Rekening</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {mockUmkmData.map((user) => (
                            <tr key={user.id} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.totalProducts}</td>
                                <td className="px-6 py-4">{user.contact}</td>
                                <td className="px-6 py-4">Rp. {user.balance.toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">{user.bank}</td>
                                <td className="px-6 py-4">{user.accountNumber}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <button className="text-gray-400 hover:text-blue-500"><EyeIcon className="w-5 h-5"/></button>
                                        <button className="text-gray-400 hover:text-green-500"><EditIcon className="w-5 h-5"/></button>
                                        <button className="text-gray-400 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
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
  );
};

export default ManageUmkm;
