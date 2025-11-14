import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { ProductData, ProductVariation } from '../../types';
import { PlusIcon, DeleteIcon } from '../icons/Icons';
import ConfirmationModal from './ConfirmationModal';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData | null;
  onUpdateProduct: (product: ProductData) => void;
}

const InputField = ({ label, id, ...props }: {label: string, id: string, [key: string]: any}) => (
    <div className="mb-4">
        <label htmlFor={id} className="inline-block bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded-t-md -mb-px">{label}</label>
        <input id={id} className="w-full px-3 py-2 border border-teal-500 rounded-b-md rounded-r-md focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:bg-gray-100 disabled:text-gray-500" {...props} />
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

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onUpdateProduct }) => {
    const [formData, setFormData] = useState<Omit<ProductData, 'id' | 'sold' | 'image' | 'variations'>>({ umkm: '', category: '', name: '', price: 0, stock: 0, permitNumber: '', description: '' });
    const [variations, setVariations] = useState<{ name: string; price: string; stock: string }[]>([]);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                umkm: product.umkm,
                category: product.category,
                name: product.name,
                price: product.price,
                stock: product.stock,
                permitNumber: product.permitNumber || '',
                description: product.description || '',
            });
            setVariations(
                (product.variations || []).map(v => ({
                    name: v.name,
                    price: String(v.price),
                    stock: String(v.stock),
                }))
            );
        }
    }, [product]);

    if (!product) return null;

    const handleInputChange = (field: keyof typeof formData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmModalOpen(true);
    };

    const handleConfirmUpdate = () => {
        const finalVariations: ProductVariation[] = variations
            .filter(v => v.name.trim() && v.price && v.stock)
            .map(v => ({
                name: v.name,
                price: parseFloat(v.price) || 0,
                stock: parseInt(v.stock, 10) || 0
            }));
        
        onUpdateProduct({
            ...product, // keeps id, sold, image
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            variations: finalVariations,
        });
        setConfirmModalOpen(false);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Edit Produk">
                <form onSubmit={handleSubmit}>
                    <InputField label="ID Produk" id="productId" value={product.id} disabled />
                    <InputField label="UMKM" id="umkm" value={formData.umkm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('umkm', e.target.value)} required />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Kategori" id="category" value={formData.category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('category', e.target.value)} required />
                        <InputField label="Stok" id="stock" type="number" value={String(formData.stock)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('stock', parseInt(e.target.value, 10) || 0)} required />
                    </div>
                    <InputField label="No. Izin Edar (BPOM, PIRT)" id="permitNumber" value={formData.permitNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('permitNumber', e.target.value)} />
                    <InputField label="Nama Produk" id="productName" value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)} required />
                    
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
                    
                    <InputField label="Harga" id="price" type="number" value={String(formData.price)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('price', parseFloat(e.target.value) || 0)} required />
                    <TextareaField label="Keterangan Produk" id="description" value={formData.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)} />

                    <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors">
                        Konfirmasi Perubahan
                    </button>
                </form>
            </Modal>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirmUpdate}
                title="Kamu yakin ingin menyimpan perubahan pada produk ini 📝?"
                confirmText="Simpan"
            >
                 <p>
                    Perubahan yang kamu lakukan akan langsung diperbarui di daftar produk dan menggantikan data sebelumnya.
                </p>
                <p>
                    Pastikan semua informasi seperti nama produk, harga, dan stok sudah benar sebelum menyimpan ya! Kalau masih ingin meninjau ulang, tekan Batal, tapi kalau sudah yakin dengan perubahanmu tekan Simpan Perubahan untuk memperbarui produk 🔄
                </p>
            </ConfirmationModal>
        </>
    );
};

export default EditProductModal;