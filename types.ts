
export type Page = 'Dashboard' | 'Kelola Produk' | 'Kelola Keuangan' | 'Kelola UMKM' | 'Kelola Pengguna' | 'Bantuan';
export type UserSubPage = 'Kelola Pengguna' | 'Pesanan' | 'Pengiriman' | 'Penjualan';

export interface UmkmData {
  id: string;
  name: string;
  totalProducts: number;
  contact: string;
  balance: number;
  bank: string;
  accountNumber: string;
}

export interface FinanceData {
    id: string;
    umkm: string;
    totalProducts: number;
    balance: number;
    disbursement: number;
    bank: string;
    accountNumber: string;
    date: string;
    status: 'Setuju';
}

export interface ProductVariation {
    name: string;
    price: number;
    stock: number;
}

export interface ProductData {
    id: string;
    name: string;
    image: string;
    category: string;
    umkm: string;
    price: number;
    sold: number;
    stock: number;
    permitNumber?: string;
    description?: string;
    variations: ProductVariation[];
}

export interface SalesData {
  id: string;
  userName: string;
  status: 'Selesai' | 'Dikirim' | 'Dibayar';
  productCount: number;
  orderDate: string;
  receiptNumber: string;
  price: number;
}

export interface ShippingData {
  id: string;
  userName: string;
  productCount: number;
  shippingDate: string;
  receiptNumber: string;
}

export interface OrderData {
  id: string;
  userName: string;
  productCount: number;
  totalPrice: number;
  date: string;
  email: string;
  address: string;
}

export interface TopProductData {
    name: string;
    image: string;
    category: string;
    price: number;
    clicks: number;
}

export interface InboxMessageData {
    id: string;
    sender: string;
    subject: string;
    date: string;
    read: boolean;
}

export interface AppUserData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  totalOrders: number;
  joinDate: string;
}