import React, { useState } from 'react';
import Modal from './Modal';
import { ProductData, ProductVariation } from '../../types';
import { PlusIcon, DeleteIcon } from '../icons/Icons';
import ConfirmationModal from './ConfirmationModal';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<ProductData, 'id' | 'sold' | 'image'>) => void;
}

const InputField = ({ label, id, error, ...props }: {label: string, id: string, error?: string, [key: string]: any}) => (
    <div className="mb-4">
        <label htmlFor={id} className="inline-block bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-t-md -mb-px">{label}</label>
        <input id={id} className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-teal-500'} rounded-b-md rounded-r-md focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`} {...props} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TextareaField = ({ label, id, ...props }: {label: string, id: string, [key: string]: any}) => (
    <div className="mb-4">
        <label htmlFor={id} className="inline-block bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-t-md -mb-px">{label}</label>
        <textarea id={id} rows={3} className="w-full px-3 py-2 border border-teal-500 rounded-b-md rounded-r-md focus:outline-none focus:ring-1 focus:ring-teal-500" {...props}></textarea>
    </div>
);

const VariationFields: React.FC<{
    variation: { name: string; price: string; stock: string };
    index: number;
    updateVariation: (index: number, field: string, value: string) => void;
    removeVariation: (index: number) => void;
}> = ({ variation, index, updateVariation, removeVariation }) => {
    return (
        <div className="p-3 border rounded-md relative mb-3 bg-gray-50 border-teal-300">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-3 items-end">
                 <div className="md:col-span-4">
                    <label className="text-xs font-medium text-gray-600 block mb-1">Nama Variasi</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Pedas" 
                        value={variation.name}
                        onChange={(e) => updateVariation(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                 <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-600 block mb-1">Harga</label>
                    <input 
                        type="number" 
                        placeholder="e.g., 15000" 
                        value={variation.price}
                        onChange={(e) => updateVariation(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                 <div className="md:col-span-1">
                    <label className="text-xs font-medium text-gray-600 block mb-1">Stok</label>
                    <input 
                        type="number" 
                        placeholder="e.g., 50" 
                        value={variation.stock}
                        onChange={(e) => updateVariation(index, 'stock', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                <div className="md:col-span-1 flex justify-end">
                     <button
                        type="button"
                        onClick={() => removeVariation(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100"
                        aria-label="Remove variation"
                    >
                        <DeleteIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
    const [umkm, setUmkm] = useState('');
    const [category, setCategory] = useState('FnB');
    const [stock, setStock] = useState('');
    const [permitNumber, setPermitNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [variations, setVariations] = useState<{ name: string; price: string; stock: string }[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleAddVariation = () => {
        setVariations([...variations, { name: '', price: '', stock: '' }]);
    };

    const handleRemoveVariation = (index: number) => {
        setVariations(variations.filter((_, i) => i !== index));
    };
    
    const handleUpdateVariation = (index: number, field: string, value: string) => {
        const newVariations = [...variations];
        newVariations[index] = { ...newVariations[index], [field]: value };
        setVariations(newVariations);
    };

    const resetForm = () => {
        setUmkm('');
        setCategory('FnB');
        setStock('');
        setPermitNumber('');
        setProductName('');
        setPrice('');
        setDescription('');
        setVariations([]);
        setErrors({});
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!umkm.trim()) newErrors.umkm = 'UMKM harus diisi.';
        if (!productName.trim()) newErrors.productName = 'Nama produk harus diisi.';
        if (!stock || parseInt(stock, 10) < 0) newErrors.stock = 'Stok harus angka valid.';
        if (!price || parseFloat(price) <= 0) newErrors.price = 'Harga harus angka yang valid.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setConfirmModalOpen(true);
    };

    const handleConfirmAdd = () => {
        const finalVariations: ProductVariation[] = variations
            .filter(v => v.name.trim() && v.price && v.stock)
            .map(v => ({
                name: v.name,
                price: parseFloat(v.price) || 0,
                stock: parseInt(v.stock, 10) || 0
            }));

        onAddProduct({
            umkm,
            category,
            name: productName,
            price: parseFloat(price) || 0,
            stock: parseInt(stock, 10) || 0,
            permitNumber,
            description,
            variations: finalVariations,
        });
        setConfirmModalOpen(false);
        resetForm();
    };

    const handleCloseModal = () => {
        resetForm();
        onClose();
    };


    return (
        <>
            <Modal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Produk Baru">
                <form onSubmit={handleSubmit}>
                    <InputField label="UMKM" id="umkm" placeholder="Masukkan User..." value={umkm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUmkm(e.target.value)} error={errors.umkm}/>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Kategori" id="category" placeholder="Auto fill" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} error={errors.category}/>
                        <InputField label="Stok" id="stock" type="number" placeholder="Masukkan Stok Produk" value={stock} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)} error={errors.stock}/>
                    </div>
                    <InputField label="No. Izin Edar (BPOM, PIRT)" id="permitNumber" placeholder="Masukkan Nomor Izin Edar (BPOM, PIRT)..." value={permitNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPermitNumber(e.target.value)} />
                    <InputField label="Nama Produk" id="productName" placeholder="Masukkan Nama Produk..." value={productName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)} error={errors.productName}/>
                    
                    <div className="mb-4">
                        <label className="inline-block bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-t-md -mb-px">Variasi Produk (Opsional)</label>
                        <div className="p-4 border border-teal-500 rounded-b-md rounded-r-md space-y-2">
                            {variations.map((v, i) => (
                            <VariationFields key={i} index={i} variation={v} updateVariation={handleUpdateVariation} removeVariation={handleRemoveVariation} />
                            ))}
                            <button
                                type="button"
                                onClick={handleAddVariation}
                                className="flex items-center text-orange-500 font-medium text-sm hover:text-orange-600"
                            >
                                <PlusIcon className="w-5 h-5 mr-1" />
                                Tambah Variasi
                            </button>
                        </div>
                    </div>

                    <InputField label="Harga" id="price" type="number" placeholder="Masukkan harga Produk..." value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} error={errors.price}/>
                    <TextareaField label="Keterangan Produk" id="description" placeholder="Masukkan Keterangan Produk..." value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />

                    <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors">
                        Tambahkan Produk Baru
                    </button>
                </form>
            </Modal>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirmAdd}
                title="Kamu yakin ingin menambahkan produk ini ke daftar produk toko? 🛍️"
                confirmText="Tambahkan"
            >
                <p>
                    Begitu dikonfirmasi, produk akan muncul di daftar dan bisa langsung dikelola. termasuk stok, harga, dan status tampil.
                </p>
                <p>
                    Pastikan semua informasi sudah lengkap dan sesuai sebelum melanjutkan ya. Kalau masih ingin melakukan perubahan, tekan Batal, tapi kalau sudah yakin tekan Tambahkan untuk menyimpannya ✨
                </p>
            </ConfirmationModal>
        </>
    );
};

export default AddProductModal;