import React from 'react';
import { ShippingData } from '../../types';
import { SearchIcon, LeftArrowIcon, RightArrowIcon } from '../../components/icons/Icons';

const mockShippingData: ShippingData[] = [
    { id: 'E001', userName: 'Mamat guncop el rumi', productCount: 2, shippingDate: '20/12/2025', receiptNumber: 'IDX987423849692364978' },
];

const ShippingPage: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800">Pengiriman</h2>
        <div className="text-sm text-gray-500 mt-1 mb-6">
            <span className="text-gray-400">Dashboard</span> / Kelola Pengguna
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-4 w-4 text-gray-400" />
                </span>
                <input type="text" placeholder="Cari Pesanan" className="w-full md:w-1/3 pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500" />
            </div>
            <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3">ID Pesanan</th>
                            <th className="px-6 py-3">Nama Pengguna</th>
                            <th className="px-6 py-3">Produk</th>
                            <th className="px-6 py-3">Tanggal Pengiriman</th>
                            <th className="px-6 py-3">Nomor Resi</th>
                            <th className="px-6 py-3">Cek Resi</th>
                            <th className="px-6 py-3">Selesaikan Pesanan Manual</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {mockShippingData.map((item) => (
                            <tr key={item.id} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                <td className="px-6 py-4">{item.userName}</td>
                                <td className="px-6 py-4">{item.productCount}</td>
                                <td className="px-6 py-4">{item.shippingDate}</td>
                                <td className="px-6 py-4">{item.receiptNumber}</td>
                                <td className="px-6 py-4">
                                    <button className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-md hover:bg-gray-300">Cek Manual Resi</button>
                                </td>
                                 <td className="px-6 py-4">
                                    <button className="bg-teal-500 text-white text-xs font-bold px-3 py-2 rounded-md hover:bg-teal-600">Selesai</button>
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

export default ShippingPage;
