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

// Format date to Indonesian format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, income, expense

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/transactions?userId=1`);
            setTransactions(response.data.data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Gagal memuat transaksi');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/transactions/${id}`);
            setTransactions(transactions.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting transaction:', err);
            alert('Gagal menghapus transaksi');
        }
    };

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat transaksi...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        📋 Riwayat Transaksi
                    </h1>
                    <p className="text-gray-600">Semua transaksi keuangan Anda</p>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                                filter === 'all'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilter('income')}
                            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                                filter === 'income'
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            💰 Pemasukan
                        </button>
                        <button
                            onClick={() => setFilter('expense')}
                            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                                filter === 'expense'
                                    ? 'bg-red-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            💸 Pengeluaran
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Transactions List */}
                <div className="space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <p className="text-gray-500 text-lg">Tidak ada transaksi</p>
                        </div>
                    ) : (
                        filteredTransactions.map(transaction => (
                            <div
                                key={transaction.id}
                                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="text-3xl">
                                            {transaction.category.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">
                                                {transaction.category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {transaction.wallet.icon} {transaction.wallet.name} • {formatDate(transaction.date)}
                                            </p>
                                            {transaction.note && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    📝 {transaction.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xl font-bold ${
                                            transaction.type === 'income' 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                        }`}>
                                            {transaction.type === 'income' ? '+' : '-'}
                                            {formatRupiah(transaction.amount)}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium"
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
