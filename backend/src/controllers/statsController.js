// backend/src/controllers/statsController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get dashboard overview statistics
export const getOverview = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        // Get total balance from all wallets
        const wallets = await prisma.wallet.findMany({
            where: { userId: parseInt(userId) },
            select: { balance: true }
        });

        const totalBalance = wallets.reduce((sum, wallet) => {
            return sum + parseFloat(wallet.balance);
        }, 0);

        // Build date filter
        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.date = {};
            if (startDate) dateFilter.date.gte = new Date(startDate);
            if (endDate) dateFilter.date.lte = new Date(endDate);
        }

        // Get total income
        const incomeTransactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId),
                type: 'income',
                ...dateFilter
            },
            select: { amount: true }
        });

        const totalIncome = incomeTransactions.reduce((sum, tx) => {
            return sum + parseFloat(tx.amount);
        }, 0);

        // Get total expenses
        const expenseTransactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId),
                type: 'expense',
                ...dateFilter
            },
            select: { amount: true }
        });

        const totalExpenses = expenseTransactions.reduce((sum, tx) => {
            return sum + parseFloat(tx.amount);
        }, 0);

        // Calculate cash flow
        const cashFlow = totalIncome - totalExpenses;

        res.json({
            success: true,
            data: {
                totalBalance,
                totalIncome,
                totalExpenses,
                cashFlow,
                cashFlowStatus: cashFlow >= 0 ? 'surplus' : 'deficit'
            }
        });

    } catch (error) {
        console.error('Error fetching overview:', error);
        res.status(500).json({
            error: 'Failed to fetch overview',
            message: error.message
        });
    }
};

// Get category breakdown for expense visualization
export const getCategoryBreakdown = async (req, res) => {
    try {
        const { userId, type, startDate, endDate } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const where = {
            userId: parseInt(userId),
            type: type || 'expense'
        };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        const transactions = await prisma.transaction.findMany({
            where,
            include: {
                category: true
            }
        });

        // Group by category
        const breakdown = {};
        transactions.forEach(tx => {
            const categoryName = tx.category.name;
            const categoryColor = tx.category.color;
            const categoryIcon = tx.category.icon;

            if (!breakdown[categoryName]) {
                breakdown[categoryName] = {
                    category: categoryName,
                    total: 0,
                    count: 0,
                    color: categoryColor,
                    icon: categoryIcon
                };
            }

            breakdown[categoryName].total += parseFloat(tx.amount);
            breakdown[categoryName].count += 1;
        });

        // Convert to array and sort by total
        const result = Object.values(breakdown).sort((a, b) => b.total - a.total);

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {
        console.error('Error fetching category breakdown:', error);
        res.status(500).json({
            error: 'Failed to fetch category breakdown',
            message: error.message
        });
    }
};
