import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: '📊', label: 'Dashboard' },
        { path: '/transactions', icon: '📋', label: 'Transaksi' },
        { path: '/add', icon: '➕', label: 'Tambah' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:top-0 md:bottom-auto z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-around md:justify-center md:gap-8 py-3">
                    {navItems.map(item => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-2xl md:text-xl">{item.icon}</span>
                                <span className="text-xs md:text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
