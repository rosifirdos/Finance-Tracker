import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import Navigation from './components/Navigation';

function App() {
    return (
        <Router>
            <div className="App pb-20 md:pb-0 md:pt-16">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<TransactionList />} />
                    <Route path="/add" element={<AddTransactionForm />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
