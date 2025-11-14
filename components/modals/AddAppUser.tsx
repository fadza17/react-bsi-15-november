
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { AppUserData } from '../../types';

interface AddAppUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<AppUserData, 'id' | 'avatar' | 'totalOrders' | 'joinDate'>) => void;
  existingUser?: AppUserData | null;
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


const AddAppUserModal: React.FC<AddAppUserModalProps> = ({ isOpen, onClose, onSave, existingUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (existingUser) {
            setName(existingUser.name);
            setEmail(existingUser.email);
        } else {
            resetForm();
        }
    }, [existingUser, isOpen]);

    const resetForm = () => {
        setName('');
        setEmail('');
        setErrors({});
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Nama Pengguna harus diisi.';
        if (!email.trim()) newErrors.email = 'Email harus diisi.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        onSave({ name, email });
        onClose();
    };

    const title = existingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru';
    const buttonText = existingUser ? 'Simpan Perubahan' : 'Tambahkan Pengguna';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} noValidate>
                <InputField label="Nama Pengguna" id="userName" placeholder="Masukkan nama pengguna..." value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={errors.name} />
                <InputField label="Email" id="email" type="email" placeholder="Masukkan email..." value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} error={errors.email} />
                
                <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors mt-8">
                    {buttonText}
                </button>
            </form>
        </Modal>
    );
};

export default AddAppUserModal;