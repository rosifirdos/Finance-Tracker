import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Format number to Indonesian Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, walletsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/stats/overview?userId=1`),
                axios.get(`${API_BASE_URL}/wallets?userId=1`)
            ]);
            
            setStats(statsRes.data.data);
            setWallets(walletsRes.data.data);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Gagal memuat data dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    const cashFlow = stats ? parseFloat(stats.totalIncome) - parseFloat(stats.totalExpenses || stats.totalExpense) : 0;
    const cashFlowColor = cashFlow >= 0 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        💰 Dashboard Keuangan
                    </h1>
                    <p className="text-gray-600">Ringkasan keuangan Anda</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Total Balance */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-medium">Total Saldo</span>
                            <span className="text-2xl">💵</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">
                            {stats ? formatRupiah(stats.totalBalance) : 'Rp 0'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Semua dompet</p>
                    </div>

                    {/* Total Income */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Pemasukan</span>
                            <span className="text-2xl">📈</span>
                        </div>
                        <p className="text-3xl font-bold">
                            {stats ? formatRupiah(stats.totalIncome) : 'Rp 0'}
                        </p>
                        <p className="text-xs text-green-100 mt-2">Total pemasukan</p>
                    </div>

                    {/* Total Expense */}
                    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Pengeluaran</span>
                            <span className="text-2xl">📉</span>
                        </div>
                        <p className="text-3xl font-bold">
                            {stats ? formatRupiah(stats.totalExpenses || stats.totalExpense || 0) : 'Rp 0'}
                        </p>
                        <p className="text-xs text-red-100 mt-2">Total pengeluaran</p>
                    </div>
                </div>

                {/* Cash Flow */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Arus Kas</h3>
                            <p className="text-sm text-gray-600">Pemasukan - Pengeluaran</p>
                        </div>
                        <div className="text-right">
                            <p className={`text-3xl font-bold ${cashFlowColor}`}>
                                {formatRupiah(cashFlow)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {cashFlow >= 0 ? '✅ Surplus' : '⚠️ Defisit'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wallets */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Dompet Saya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {wallets.map(wallet => (
                            <div 
                                key={wallet.id}
                                className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl">{wallet.icon}</span>
                                    <span className="text-xs text-gray-500 uppercase">{wallet.type}</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-1">{wallet.name}</h4>
                                <p className="text-2xl font-bold text-blue-600">
                                    {formatRupiah(wallet.balance)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
