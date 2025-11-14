
import React, { useState } from 'react';
import Modal from './Modal';
import { UmkmData } from '../../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Pick<UmkmData, 'name' | 'bank' | 'accountNumber' | 'contact'>) => void;
}

const InputField = ({ label, id, error, ...props }: {label: string, id: string, error?: string, [key: string]: any}) => (
    <div className="relative mt-6">
        <label 
            htmlFor={id} 
            className="absolute -top-2.5 left-4 bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-md"
        >
            {label}
        </label>
        <input 
            id={id} 
            className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-teal-500'} rounded-lg focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`}
            {...props} 
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);


const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const resetForm = () => {
        setName('');
        setBank('');
        setAccountNumber('');
        setContact('');
        setErrors({});
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Nama Pengguna harus diisi.';
        if (!bank.trim()) newErrors.bank = 'Nama Bank harus diisi.';
        if (!accountNumber.trim()) newErrors.accountNumber = 'Nomor Rekening harus diisi.';
        if (!contact.trim()) newErrors.contact = 'Kontak harus diisi.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        onAddUser({ name, bank, accountNumber, contact });
        resetForm();
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Tambah Pengguna Baru">
            <form onSubmit={handleSubmit} noValidate>
                <InputField label="Nama Pengguna" id="userName" placeholder="Masukkan User..." value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={errors.name} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Bank" id="bank" placeholder="Masukkan Nama Bank..." value={bank} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBank(e.target.value)} error={errors.bank} />
                    <InputField label="Rekening" id="accountNumber" placeholder="Masukkan Rekening" value={accountNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)} error={errors.accountNumber} />
                </div>

                <InputField label="Kontak" id="contact" placeholder="Masukkan Kontak..." value={contact} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact(e.target.value)} error={errors.contact} />
                
                <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors mt-8">
                    Tambahkan Pencairan Dana
                </button>
            </form>
        </Modal>
    );
};

export default AddUserModal;