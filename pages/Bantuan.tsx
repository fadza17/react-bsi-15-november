
import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon } from '../components/icons/Icons';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                className="w-full text-left flex justify-between items-center py-4 px-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h4 className="font-semibold text-gray-700">{question}</h4>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 px-2 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


const Bantuan: React.FC = () => {
    const faqs = [
        {
            question: "Bagaimana cara menambahkan produk baru?",
            answer: "Untuk menambahkan produk baru, pergi ke halaman 'Kelola Produk', lalu klik tombol 'Tambah Produk Baru'. Isi semua detail yang diperlukan di formulir modal yang muncul dan klik 'Tambahkan Produk Baru' untuk menyimpan."
        },
        {
            question: "Bagaimana cara mengelola keuangan UMKM?",
            answer: "Halaman 'Kelola Keuangan' memungkinkan Anda untuk melihat dan mengelola permintaan pencairan dana dari UMKM. Anda dapat menyetujui permintaan dan melacak riwayat transaksi."
        },
        {
            question: "Apa fungsi dari halaman 'Kelola Pengguna'?",
            answer: "Di 'Kelola Pengguna', Anda dapat mengelola semua data yang terkait dengan pengguna akhir, termasuk pesanan, status pengiriman, dan riwayat penjualan. Anda juga dapat melihat daftar pengguna yang terdaftar."
        },
        {
            question: "Bisakah saya mengedit informasi produk yang sudah ada?",
            answer: "Ya, di halaman 'Kelola Produk', setiap produk dalam daftar memiliki ikon 'Edit'. Klik ikon ini untuk membuka modal di mana Anda dapat memperbarui detail produk."
        }
    ];

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Pusat Bantuan</h2>
                <div className="text-sm text-gray-500 mt-1">
                    <span className="text-gray-400">Dashboard</span> / Bantuan
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FAQ Section */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Pertanyaan yang Sering Diajukan (FAQ)</h3>
                    <div className="relative mb-6">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-4 w-4 text-gray-400" />
                        </span>
                        <input 
                            type="text" 
                            placeholder="Cari pertanyaan..." 
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                    </div>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>

                {/* Contact Support Section */}
                <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Hubungi Dukungan</h3>
                    <p className="text-sm text-gray-600 mb-6">Tidak dapat menemukan jawaban yang Anda cari? Tim kami siap membantu.</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Nama Anda" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="anda@email.com" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                            <input type="text" id="subject" name="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Tentang apa ini?" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                            <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Tulis pesan Anda di sini..."></textarea>
                        </div>
                        <button type="submit" className="w-full bg-teal-500 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                            Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Bantuan;
