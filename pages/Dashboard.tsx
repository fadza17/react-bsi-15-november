import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, SearchIcon, DownloadIcon, SendIcon, DeleteIcon, DotsHorizontalIcon, LeftArrowIcon, RightArrowIcon } from '../components/icons/Icons';
import { TopProductData, InboxMessageData, SalesData } from '../types';
import DonutChart from '../components/DonutChart';

// --- MOCK DATA ---
// More extensive mock sales data to simulate a database
const mockSales: SalesData[] = [
    { id: 'S001', userName: 'Andi', status: 'Selesai', productCount: 2, orderDate: '01/07/2024', receiptNumber: 'IDX1', price: 150000 },
    { id: 'S002', userName: 'Budi', status: 'Selesai', productCount: 1, orderDate: '03/07/2024', receiptNumber: 'IDX2', price: 75000 },
    { id: 'S003', userName: 'Citra', status: 'Selesai', productCount: 3, orderDate: '03/07/2024', receiptNumber: 'IDX3', price: 220000 },
    // Today's sales (assuming today is July 25, 2024 for consistent demo)
    { id: 'S004', userName: 'Dewi', status: 'Selesai', productCount: 5, orderDate: '25/07/2024', receiptNumber: 'IDX4', price: 300000 },
    { id: 'S005', userName: 'Eka', status: 'Selesai', productCount: 2, orderDate: '25/07/2024', receiptNumber: 'IDX5', price: 125000 },
    { id: 'S006', userName: 'Fani', status: 'Selesai', productCount: 1, orderDate: '25/07/2024', receiptNumber: 'IDX6', price: 52000 },
    // Previous month's sales
    { id: 'S007', userName: 'Gita', status: 'Selesai', productCount: 4, orderDate: '15/06/2024', receiptNumber: 'IDX7', price: 400000 },
    { id: 'S008', userName: 'Hadi', status: 'Selesai', productCount: 2, orderDate: '20/06/2024', receiptNumber: 'IDX8', price: 180000 },
     // Add a specific sale for the default design value to appear on a specific date
    { id: 'S009', userName: 'Test User', status: 'Selesai', productCount: 33, orderDate: '20/05/2024', receiptNumber: 'IDX9', price: 10777 },
];


const StatCard: React.FC<{ title: string; amount: string; detail: string; onCalendarClick: () => void }> = ({ title, amount, detail, onCalendarClick }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex-1 border border-gray-100">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{amount}</p>
                <p className="text-xs text-gray-400 mt-2">{detail}</p>
            </div>
            <button onClick={onCalendarClick} className="p-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500">
                <img src="/assets/img/calendar.svg" alt="Calendar" className="w-5 h-5"/>
            </button>
        </div>
    </div>
);

const Calendar: React.FC<{
    onDateSelect: (date: Date) => void;
    onClose: () => void;
}> = ({ onDateSelect, onClose }) => {
    const [date, setDate] = useState(new Date());

    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const changeMonth = (amount: number) => {
        setDate(new Date(date.getFullYear(), date.getMonth() + amount, 1));
    };

    const handleDateClick = (day: number) => {
        const selected = new Date(date.getFullYear(), date.getMonth(), day);
        onDateSelect(selected);
        onClose();
    };

    return (
        <div className="absolute top-full right-0 mt-2 bg-white p-4 rounded-lg shadow-2xl border z-20 w-72">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100">&lt;</button>
                <div className="font-bold text-gray-700">{monthNames[date.getMonth()]} {date.getFullYear()}</div>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    return (
                        <button 
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className="p-2 text-sm text-center rounded-full hover:bg-teal-100"
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


const mockTopProducts: TopProductData[] = [
    { name: 'Apple Watch Series 7', image: 'https://picsum.photos/seed/watch1/40/40', category: 'Electronics', price: 269, clicks: 22 },
    { name: 'Apple Watch Series 7', image: 'https://picsum.photos/seed/watch2/40/40', category: 'Electronics', price: 269, clicks: 22 },
    { name: 'Apple Watch Series 7', image: 'https://picsum.photos/seed/watch3/40/40', category: 'Electronics', price: 269, clicks: 22 },
];

const mockInboxMessages: InboxMessageData[] = [
    { id: '1', sender: 'Musharod Chowdury', subject: 'Some note & lorem in some form.', date: '17 Oct, 2024', read: false },
    { id: '2', sender: 'Naimur Rahman', subject: 'Lorem ipsum alteration in some form.', date: '25 Nov, 2024', read: false },
    { id: '3', sender: 'Shafiq Hammad', subject: 'Lorem available alteration in some form.', date: '25 Nov, 2024', read: true },
    { id: '4', sender: 'Alex Semuyel', subject: 'Lorem ipsum available in some form.', date: '25 Nov, 2024', read: true },
    { id: '5', sender: 'Jhon Smith', subject: 'available alteration in some form.', date: '25 Nov, 2024', read: true },
];

const visitorData = [
    { name: 'Desktop', value: 65, color: '#0d9488' }, // teal-600
    { name: 'Mobile', value: 45, color: '#f97316' }, // orange-500
    { name: 'Tablet', value: 34, color: '#2dd4bf' }, // teal-400
    { name: 'Unknow', value: 12, color: '#f59e0b' }  // amber-500
];

const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'incoming' | 'done'>('incoming');
    const [selectedDate, setSelectedDate] = useState(new Date(2024, 4, 20)); // Default to date with specific mock data
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const calendarContainerRef = useRef<HTMLDivElement>(null);
    const [stats, setStats] = useState({
        total: { revenue: 0, orders: 0 },
        month: { revenue: 0, orders: 0 },
        day: { revenue: 0, orders: 0 },
    });

    useEffect(() => {
        const isSameDay = (d1: Date, d2: Date) =>
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();

        // Day stats
        const dayFilteredSales = mockSales.filter(sale => isSameDay(parseDate(sale.orderDate), selectedDate));
        const dayRevenue = dayFilteredSales.reduce((sum, sale) => sum + sale.price, 0);
        const dayOrders = dayFilteredSales.reduce((sum, sale) => sum + sale.productCount, 0);

        // Month stats
        const monthFilteredSales = mockSales.filter(sale => {
            const saleDate = parseDate(sale.orderDate);
            return saleDate.getFullYear() === selectedDate.getFullYear() && saleDate.getMonth() === selectedDate.getMonth();
        });
        const monthRevenue = monthFilteredSales.reduce((sum, sale) => sum + sale.price, 0);
        const monthOrders = monthFilteredSales.reduce((sum, sale) => sum + sale.productCount, 0);

        // Total stats
        const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.price, 0);
        const totalOrders = mockSales.reduce((sum, sale) => sum + sale.productCount, 0);
        
        setStats({
            total: { revenue: totalRevenue, orders: totalOrders },
            month: { revenue: monthRevenue, orders: monthOrders },
            day: { revenue: dayRevenue, orders: dayOrders },
        });

    }, [selectedDate]);
    
     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarContainerRef.current && !calendarContainerRef.current.contains(event.target as Node)) {
                setCalendarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatCurrency = (amount: number) => `Rp. ${amount.toLocaleString('id-ID')}`;
    const formatOrders = (count: number) => `${count.toLocaleString('id-ID')} pesanan`;
    const formatKOrders = (count: number) => `${(count / 1000).toFixed(1)}k pesanan`;

    return (
        <div>
            {/* Header Cards */}
            <div className="relative" ref={calendarContainerRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard 
                        title="Total Saldo Midtrans" 
                        amount={formatCurrency(stats.total.revenue)} 
                        detail={formatKOrders(stats.total.orders)}
                        onCalendarClick={() => setCalendarOpen(!isCalendarOpen)}
                    />
                    <StatCard 
                        title={`Pendapatan Bulan ${selectedDate.toLocaleString('id-ID', { month: 'long' })}`}
                        amount={formatCurrency(stats.month.revenue)} 
                        detail={formatOrders(stats.month.orders)}
                        onCalendarClick={() => setCalendarOpen(!isCalendarOpen)}
                    />
                    <StatCard 
                        title={`Pendapatan ${selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}`}
                        amount={formatCurrency(stats.day.revenue)}
                        detail={formatOrders(stats.day.orders)}
                        onCalendarClick={() => setCalendarOpen(!isCalendarOpen)}
                    />
                </div>
                {isCalendarOpen && <Calendar onDateSelect={setSelectedDate} onClose={() => setCalendarOpen(false)} />}
            </div>

            {/* Analytics and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Visitors Analytics</h3>
                        <button className="text-sm text-gray-600 border rounded-md px-3 py-1 flex items-center">
                            Monthly <ChevronDownIcon className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <DonutChart data={visitorData} visitors={2548} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 bg-white px-3 py-1 text-xs font-semibold text-green-600 border border-green-200 rounded-full">20.93%</div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {visitorData.map(item => (
                                <div key={item.name} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.value}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Top Product Interest</h3>
                    <div className="text-xs text-gray-400 uppercase grid grid-cols-4 gap-2 mb-2 px-2">
                        <span>Product Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span className="text-right">Click</span>
                    </div>
                    <div className="space-y-2">
                        {mockTopProducts.map((product, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 items-center text-sm p-2 rounded-md hover:bg-gray-50">
                                <div className="flex items-center space-x-2">
                                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded-md object-cover" />
                                    <span className="text-gray-800 font-medium">{product.name}</span>
                                </div>
                                <span className="text-gray-500">{product.category}</span>
                                <span className="text-gray-800 font-medium">${product.price}</span>
                                <span className="text-gray-500 text-right">{product.clicks}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-teal-500 text-white mt-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        Kelola Produk
                    </button>
                </div>
            </div>

            {/* Bantuan Pengguna */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                         <div className="flex border border-gray-200 rounded-lg p-0.5">
                            <button onClick={() => setActiveTab('incoming')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${activeTab === 'incoming' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Pertanyaan Masuk</button>
                            <button onClick={() => setActiveTab('done')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${activeTab === 'done' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Selesai</button>
                         </div>
                         <div className="flex items-center space-x-1 text-gray-500">
                             <button className="p-2 hover:bg-gray-100 rounded-md"><DownloadIcon className="w-5 h-5"/></button>
                             <button className="p-2 hover:bg-gray-100 rounded-md"><SendIcon className="w-5 h-5"/></button>
                             <button className="p-2 hover:bg-gray-100 rounded-md"><DeleteIcon className="w-5 h-5"/></button>
                             <button className="p-2 hover:bg-gray-100 rounded-md"><DotsHorizontalIcon className="w-5 h-5"/></button>
                         </div>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-4 w-4 text-gray-400" />
                        </span>
                        <input type="text" placeholder="Search for Pengguna, email, address..." className="w-full md:w-64 pl-9 pr-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"/>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-3 w-12"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></th>
                                <th className="px-4 py-3 font-medium text-gray-500">Sender</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Subject</th>
                                <th className="px-4 py-3 font-medium text-gray-500 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInboxMessages.map(msg => (
                                <tr key={msg.id} className={`border-b hover:bg-gray-50 ${!msg.read ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" /></td>
                                    <td className="px-4 py-3">{msg.sender}</td>
                                    <td className="px-4 py-3">{msg.subject}</td>
                                    <td className="px-4 py-3 text-right">{msg.date}</td>
                                </tr>
                            ))}
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
        </div>
    );
};

export default Dashboard;