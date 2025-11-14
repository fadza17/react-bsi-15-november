
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { FinanceData } from '../../types';
import ConfirmationModal from './ConfirmationModal';

interface ManualDisbursementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDisbursement: (data: Omit<FinanceData, 'id' | 'totalProducts' | 'date' | 'status'>) => void;
  umkmUsers: { [key: string]: { bank: string; accountNumber: string; totalIncome: number } };
}

const FormInput: React.FC<{ label: string; id: string; placeholder: string; value: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled?: boolean; type?: string; list?: string; }> = ({ label, id, ...props }) => {
    return (
        <div className="relative mb-6">
            <label 
                htmlFor={id} 
                className="absolute -top-2.5 left-3 bg-white px-1 text-sm font-medium text-orange-500"
            >
                {label}
            </label>
            <input
                id={id}
                className="w-full px-4 py-3 border border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                {...props}
            />
        </div>
    );
};


const ManualDisbursementModal: React.FC<ManualDisbursementModalProps> = ({ isOpen, onClose, onAddDisbursement, umkmUsers }) => {
    const [user, setUser] = useState('');
    const [bank, setBank] = useState('Auto fill');
    const [rekening, setRekening] = useState('Auto fill');
    const [totalPendapatan, setTotalPendapatan] = useState('Auto fill');
    const [nominal, setNominal] = useState('');
    const [buktiTransfer, setBuktiTransfer] = useState('');
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [stagedData, setStagedData] = useState<Omit<FinanceData, 'id' | 'totalProducts' | 'date' | 'status'> | null>(null);

    useEffect(() => {
        if (umkmUsers[user]) {
            const userData = umkmUsers[user];
            setBank(userData.bank);
            setRekening(userData.accountNumber);
            setTotalPendapatan(`Rp. ${userData.totalIncome.toLocaleString('id-ID')}`);
        } else {
            setBank('Auto fill');
            setRekening('Auto fill');
            setTotalPendapatan('Auto fill');
        }
    }, [user, umkmUsers]);

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const resetForm = () => {
        setUser('');
        setNominal('');
        setBuktiTransfer('');
        setBank('Auto fill');
        setRekening('Auto fill');
        setTotalPendapatan('Auto fill');
    };
    
    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!user || !nominal || !buktiTransfer || bank === 'Auto fill') {
            alert('Silakan isi semua kolom yang diperlukan dan pilih pengguna yang valid.');
            return;
        }

        const disbursementAmount = parseFloat(nominal.replace(/[^0-9]/g, ''));
        const balance = parseFloat(totalPendapatan.replace(/[^0-9]/g, '')) || 0;

        setStagedData({
            umkm: user,
            balance: balance,
            disbursement: disbursementAmount,
            bank: bank,
            accountNumber: rekening,
        });
        setConfirmOpen(true);
    };

    const handleConfirmDisbursement = () => {
        if (stagedData) {
            onAddDisbursement(stagedData);
        }
        setConfirmOpen(false);
        setStagedData(null);
        handleClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} title="Pencairan Dana Manual">
                <form onSubmit={handleSubmit} noValidate>
                    <datalist id="umkm-users">
                        {Object.keys(umkmUsers).map(name => <option key={name} value={name} />)}
                    </datalist>
                    <FormInput
                        label="User"
                        id="user"
                        placeholder="Masukkan User..."
                        value={user}
                        onChange={handleUserChange}
                        list="umkm-users"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Bank"
                            id="bank"
                            placeholder="Auto fill"
                            value={bank}
                            disabled
                        />
                        <FormInput
                            label="Rekening"
                            id="rekening"
                            placeholder="Auto fill"
                            value={rekening}
                            disabled
                        />
                    </div>
                    <FormInput
                        label="Total Pendapatan User"
                        id="totalPendapatan"
                        placeholder="Auto fill"
                        value={totalPendapatan}
                        disabled
                    />
                    <FormInput
                        label="Nominal Pencairan Dana"
                        id="nominal"
                        type="number"
                        placeholder="Masukkan Nominal Pencairan Dana..."
                        value={nominal}
                        onChange={(e) => setNominal(e.target.value)}
                    />
                    <FormInput
                        label="Bukti Transfer"
                        id="buktiTransfer"
                        placeholder="Masukkan Nomor Refrensi Transfer..."
                        value={buktiTransfer}
                        onChange={(e) => setBuktiTransfer(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors"
                    >
                        Tambahkan Pencairan Dana
                    </button>
                </form>
            </Modal>
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirmDisbursement}
                title="Konfirmasi Pencairan Dana 💰"
            >
                <p>Anda akan menambahkan data pencairan dana baru. Pastikan semua informasi sudah benar sebelum melanjutkan.</p>
                <p>Tekan "Simpan Data" untuk mengonfirmasi atau "Batal" untuk kembali ke formulir.</p>
            </ConfirmationModal>
        </>
    );
};

export default ManualDisbursementModal;