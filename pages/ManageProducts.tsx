import React, { useState, useEffect } from 'react';
import { SearchIcon, EditIcon, DeleteIcon, LeftArrowIcon, RightArrowIcon } from '../components/icons/Icons';
import { ProductData } from '../types';
import AddProductModal from '../components/modals/AddProductModal';
import EditProductModal from '../components/modals/EditProductModal';
import { useToast } from '../context/ToastContext';
import SuccessModal from '../components/modals/SuccessModal';

const mockProductData: ProductData[] = [
    { 
        id: 'A001', 
        name: 'Basreng Turbo 4 silinder', 
        image: 'https://picsum.photos/seed/basreng/40/40', 
        category: 'FnB', 
        umkm: 'Basreng goreng...', 
        price: 10000, 
        sold: 22, 
        stock: 100,
        permitNumber: 'P-IRT 2063204012345-25',
        description: 'Basreng pedas dengan bumbu rahasia, dijamin ketagihan!',
        variations: [
            { name: 'Original', price: 10000, stock: 50 },
            { name: 'Pedas Daun Jeruk', price: 12000, stock: 50 }
        ]
    },
    // Add more mock data if needed
];

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const { addToast } = useToast();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setProducts(mockProductData);
        setLoading(false);
    }, 1500);
  }, []);

  const handleEditClick = (product: ProductData) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleAddProduct = (newProductData: Omit<ProductData, 'id' | 'sold' | 'image'>) => {
    const newProduct: ProductData = {
      ...newProductData,
      id: `A${String(products.length + 1).padStart(3, '0')}`,
      sold: 0,
      image: `https://picsum.photos/seed/${Math.random()}/40/40`,
    };
    setProducts([...products, newProduct]);
    setAddModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct: ProductData) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditModalOpen(false);
    setSelectedProduct(null);
    setSuccessModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== productId));
      addToast('Produk berhasil dihapus!', 'error');
    }
  };

  const calculateTotalStock = (product: ProductData) => {
    const mainStock = product.stock || 0;
    const variationStock = product.variations.reduce((acc, v) => acc + v.stock, 0);
    return mainStock + variationStock;
  }

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-10">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <span className="ml-3 text-gray-500">Memuat produk...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (products.length === 0) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-10 text-gray-500">
            Tidak ada produk yang ditemukan.
          </td>
        </tr>
      );
    }

    return products.map((product) => (
        <tr key={product.id} className="bg-white hover:bg-gray-50">
          <td className="px-6 py-4 font-medium text-gray-900">{product.id}</td>
          <td className="px-6 py-4 flex items-center space-x-3">
            <img src={product.image} alt={product.name} className="w-8 h-8 rounded-md object-cover" />
            <span>{product.name}</span>
          </td>
          <td className="px-6 py-4">{product.category}</td>
          <td className="px-6 py-4">{product.umkm}</td>
          <td className="px-6 py-4">Rp. {product.price.toLocaleString('id-ID')}</td>
          <td className="px-6 py-4">{product.sold}</td>
          <td className="px-6 py-4">{calculateTotalStock(product)}</td>
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => handleEditClick(product)} className="text-gray-400 hover:text-green-500"><EditIcon className="w-5 h-5"/></button>
              <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-500"><DeleteIcon className="w-5 h-5"/></button>
            </div>
          </td>
        </tr>
      ));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kelola Produk</h2>
          <div className="text-sm text-gray-500 mt-1">
            <span className="text-gray-400">Dashboard</span> / Kelola Produk
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Semua Produk</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </span>
              <input 
                type="text" 
                placeholder="Cari produk dari UMKM" 
                className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
            >
              Tambah Produk Baru
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3">ID Produk</th>
                <th className="px-6 py-3">Nama Produk</th>
                <th className="px-6 py-3">Kategori</th>
                <th className="px-6 py-3">UMKM</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Sold</th>
                <th className="px-6 py-3">Stok</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {renderTableContent()}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
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

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAddProduct={handleAddProduct} />
      {selectedProduct && <EditProductModal isOpen={isEditModalOpen} onClose={() => { setEditModalOpen(false); setSelectedProduct(null); }} product={selectedProduct} onUpdateProduct={handleUpdateProduct} />}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Data Kamu telah berhasil disimpan! 💾✨"
      >
        <p>Semua perubahan telah disimpan dan aman.</p>
        <p>Kamu bisa melanjutkan pekerjaan tanpa khawatir. 👍</p>
      </SuccessModal>
    </div>
  );
};

export default ManageProducts;