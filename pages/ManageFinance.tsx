
import React, { useState } from 'react';
import { ChevronDownIcon, LeftArrowIcon, RightArrowIcon } from '../components/icons/Icons';
import { FinanceData } from '../types';
import ManualDisbursementModal from '../components/modals/ManualDisbursementModal';
import SuccessModal from '../components/modals/SuccessModal';

const mockFinanceData: FinanceData[] = [
    { id: 'B010', umkm: 'Basreng bakar by Hilni', totalProducts: 3, balance: 120000, disbursement: 120000, bank: 'Mandiri', accountNumber: '1020938091', date: '20/20/2025', status: 'Setuju' },
    // Add more mock data if needed
];

const mockUmkmUsers: { [key: string]: { bank: string; accountNumber: string; totalIncome: number } } = {
    'Basreng bakar by Hilni': {
        bank: 'Mandiri',
        accountNumber: '1020938091',
        totalIncome: 120000,
    },
    'Warung Seblak Teh Euis': {
        bank: 'BCA',
        accountNumber: '8887776665',
        totalIncome: 2500000,
    },
    'Kopi Senja Abadi': {
        bank: 'BRI',
        accountNumber: '1234567890',
        totalIncome: 750000,
    }
};

const ManageFinance: React.FC = () => {
    const [financeData, setFinanceData] = useState<FinanceData[]>(mockFinanceData);
    const [isManualModalOpen, setManualModalOpen] = useState(false);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const handleAddDisbursement = (data: Omit<FinanceData, 'id' | 'totalProducts' | 'date' | 'status'>) => {
        const newEntry: FinanceData = {
            id: `B0${String(financeData.length + 10)}`,
            umkm: data.umkm,
            totalProducts: 0, // Manual entry, so product count is 0
            balance: data.balance,
            disbursement: data.disbursement,
            bank: data.bank,
            accountNumber: data.accountNumber,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            status: 'Setuju'
        };
        setFinanceData(prevData => [...prevData, newEntry]);
        setManualModalOpen(false);
        setSuccessModalOpen(true);
    };

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Kelola Keuangan</h2>
                <div className="text-sm text-gray-500 mt-1">
                    <span className="text-gray-400">Dashboard</span> / Kelola Produk
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-700">Request Pencairan dana</h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full md:w-auto gap-4">
                    <button onClick={() => setManualModalOpen(true)} className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors flex items-center justify-center space-x-2">
                        <span>Tambah Pencairan Manual</span>
                    </button>
                    <div className="relative">
                        <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 w-full justify-between">
                            <span>Request Pencairan Dana</span>
                            <ChevronDownIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-3">ID Pencairan</th>
                            <th className="px-6 py-3">UMKM</th>
                            <th className="px-6 py-3">Total Produk</th>
                            <th className="px-6 py-3">Saldo</th>
                            <th className="px-6 py-3">Pencairan</th>
                            <th className="px-6 py-3">Bank</th>
                            <th className="px-6 py-3">Rekening</th>
                            <th className="px-6 py-3">Tanggal</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {financeData.map((req) => (
                            <tr key={req.id} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{req.id}</td>
                                <td className="px-6 py-4">{req.umkm}</td>
                                <td className="px-6 py-4">{req.totalProducts}</td>
                                <td className="px-6 py-4">Rp. {req.balance.toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">Rp. {req.disbursement.toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4">{req.bank}</td>
                                <td className="px-6 py-4">{req.accountNumber}</td>
                                <td className="px-6 py-4">{req.date}</td>
                                <td className="px-6 py-4">
                                    <button className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                        {req.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500 gap-4">
                <p>Showing <span className="font-semibold text-gray-700">1-5</span> of <span className="font-semibold text-gray-700">29</span></p>
                <div className="flex items-center space-x-1">
                    <button className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>
                        <LeftArrowIcon className="w-5 h-5" />
                    </button>
                    <button className="px-3 py-1 rounded-md text-white bg-teal-600">1</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
                    <span className="px-2 py-1">...</span>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100">8</button>
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <RightArrowIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        <ManualDisbursementModal
            isOpen={isManualModalOpen}
            onClose={() => setManualModalOpen(false)}
            onAddDisbursement={handleAddDisbursement}
            umkmUsers={mockUmkmUsers}
        />

        <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            title="Pencairan Dana Berhasil! 💸"
        >
            <p>Pencairan dana manual telah berhasil ditambahkan ke dalam daftar.</p>
            <p>Anda dapat melihat entri baru di tabel keuangan.</p>
        </SuccessModal>
    </div>
  );
};

export default ManageFinance;