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

const AddTransactionForm = () => {
    const [formData, setFormData] = useState({
        userId: 1, // Hardcoded untuk sementara
        walletId: '',
        categoryId: '',
        type: 'expense',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
    });

    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch wallets and categories on component mount
    useEffect(() => {
        fetchWallets();
        fetchCategories();
    }, []);

    // Fetch categories when type changes
    useEffect(() => {
        fetchCategories();
    }, [formData.type]);

    const fetchWallets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wallets?userId=1`);
            setWallets(response.data.data);
            // Set first wallet as default
            if (response.data.data.length > 0 && !formData.walletId) {
                setFormData(prev => ({ ...prev, walletId: response.data.data[0].id }));
            }
        } catch (err) {
            console.error('Error fetching wallets:', err);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/categories?userId=1&type=${formData.type}`
            );
            setCategories(response.data.data);
            // Set first category as default
            if (response.data.data.length > 0) {
                setFormData(prev => ({ ...prev, categoryId: response.data.data[0].id }));
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validasi
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('Silakan masukkan jumlah yang valid');
            setLoading(false);
            return;
        }

        if (!formData.walletId || !formData.categoryId) {
            setError('Silakan pilih dompet dan kategori');
            setLoading(false);
            return;
        }

        try {
            // Convert date to ISO format
            const dateObj = new Date(formData.date);
            dateObj.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues

            const payload = {
                userId: formData.userId,
                walletId: parseInt(formData.walletId),
                categoryId: parseInt(formData.categoryId),
                type: formData.type,
                amount: parseFloat(formData.amount),
                date: dateObj.toISOString(),
                note: formData.note || null
            };

            const response = await axios.post(`${API_BASE_URL}/transactions`, payload);

            // Sukses!
            setSuccess(`Transaksi berhasil ditambahkan! Saldo baru: ${formatRupiah(response.data.walletBalance)}`);

            // Clear form
            setFormData({
                userId: 1,
                walletId: formData.walletId, // Keep same wallet
                categoryId: categories[0]?.id || '',
                type: formData.type, // Keep same type
                amount: '',
                date: new Date().toISOString().split('T')[0],
                note: ''
            });

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);

        } catch (err) {
            console.error('Error creating transaction:', err);
            setError(err.response?.data?.message || 'Gagal membuat transaksi');
        } finally {
            setLoading(false);
        }
    };

    const getTypeButtonClass = (type) => {
        const isSelected = formData.type === type;
        const baseClass = "flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 tap-highlight-none";

        if (type === 'income') {
            return `${baseClass} ${isSelected
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
        } else {
            return `${baseClass} ${isSelected
                ? 'bg-red-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Tambah Transaksi
                    </h1>
                    <p className="text-gray-600">Catat pemasukan dan pengeluaran Anda</p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-5">

                    {/* Type Toggle */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jenis Transaksi
                        </label>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                                className={getTypeButtonClass('income')}
                            >
                                💰 Pemasukan
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                                className={getTypeButtonClass('expense')}
                            >
                                💸 Pengeluaran
                            </button>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                            Jumlah
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                Rp
                            </span>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                step="1000"
                                min="0"
                                placeholder="0"
                                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Wallet Selection */}
                    <div>
                        <label htmlFor="walletId" className="block text-sm font-medium text-gray-700 mb-2">
                            Dompet
                        </label>
                        <select
                            id="walletId"
                            name="walletId"
                            value={formData.walletId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white"
                            required
                        >
                            <option value="">Pilih Dompet</option>
                            {wallets.map(wallet => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.icon} {wallet.name} - {formatRupiah(wallet.balance)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none bg-white"
                            required
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Input */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Tanggal
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            required
                        />
                    </div>

                    {/* Note Input */}
                    <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                            Catatan (Opsional)
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Tambahkan catatan..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <p className="text-green-700 text-sm font-medium">{success}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${loading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 active:scale-95 shadow-lg hover:shadow-xl'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses...
                            </span>
                        ) : (
                            `Tambah ${formData.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}`
                        )}
                    </button>
                </form>

                {/* Info Card */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                        💡 <strong>Tips:</strong> Saldo dompet akan diperbarui secara otomatis saat Anda menambahkan transaksi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddTransactionForm;
