// backend/src/controllers/transactionController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new transaction with automatic wallet balance update
export const createTransaction = async (req, res) => {
    try {
        const { userId, walletId, categoryId, amount, date, type, note } = req.body;

        // Validate required fields
        if (!userId || !walletId || !categoryId || !amount || !date || !type) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['userId', 'walletId', 'categoryId', 'amount', 'date', 'type']
            });
        }

        // Validate transaction type
        if (type !== 'income' && type !== 'expense') {
            return res.status(400).json({
                error: 'Invalid transaction type',
                message: 'Type must be either "income" or "expense"'
            });
        }

        // Use Prisma transaction to ensure data integrity
        const result = await prisma.$transaction(async (tx) => {
            // Create the transaction
            const transaction = await tx.transaction.create({
                data: {
                    userId: parseInt(userId),
                    walletId: parseInt(walletId),
                    categoryId: parseInt(categoryId),
                    amount: parseFloat(amount),
                    date: new Date(date),
                    type,
                    note: note || null,
                },
                include: {
                    wallet: true,
                    category: true,
                }
            });

            // Update wallet balance
            const balanceChange = type === 'income'
                ? parseFloat(amount)
                : -parseFloat(amount);

            const updatedWallet = await tx.wallet.update({
                where: { id: parseInt(walletId) },
                data: {
                    balance: {
                        increment: balanceChange
                    }
                }
            });

            return { transaction, updatedWallet };
        });

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            data: result.transaction,
            walletBalance: result.updatedWallet.balance
        });

    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({
            error: 'Failed to create transaction',
            message: error.message
        });
    }
};

// Get all transactions with optional filters
export const getTransactions = async (req, res) => {
    try {
        const { userId, walletId, categoryId, type, startDate, endDate } = req.query;

        const where = {};

        if (userId) where.userId = parseInt(userId);
        if (walletId) where.walletId = parseInt(walletId);
        if (categoryId) where.categoryId = parseInt(categoryId);
        if (type) where.type = type;

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        const transactions = await prisma.transaction.findMany({
            where,
            include: {
                wallet: true,
                category: true,
            },
            orderBy: {
                date: 'desc'
            }
        });

        res.json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({
            error: 'Failed to fetch transactions',
            message: error.message
        });
    }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, date, type, note, categoryId } = req.body;

        // Get the original transaction to calculate balance difference
        const originalTransaction = await prisma.transaction.findUnique({
            where: { id: parseInt(id) }
        });

        if (!originalTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Use transaction to update both transaction and wallet balance
        const result = await prisma.$transaction(async (tx) => {
            // Revert the original transaction's effect on wallet balance
            const originalEffect = originalTransaction.type === 'income'
                ? -parseFloat(originalTransaction.amount)
                : parseFloat(originalTransaction.amount);

            // Calculate new effect
            const newType = type || originalTransaction.type;
            const newAmount = amount !== undefined ? parseFloat(amount) : parseFloat(originalTransaction.amount);
            const newEffect = newType === 'income' ? newAmount : -newAmount;

            // Net change to wallet balance
            const netChange = originalEffect + newEffect;

            // Update transaction
            const updatedTransaction = await tx.transaction.update({
                where: { id: parseInt(id) },
                data: {
                    ...(amount !== undefined && { amount: parseFloat(amount) }),
                    ...(date && { date: new Date(date) }),
                    ...(type && { type }),
                    ...(note !== undefined && { note }),
                    ...(categoryId && { categoryId: parseInt(categoryId) }),
                },
                include: {
                    wallet: true,
                    category: true,
                }
            });

            // Update wallet balance
            await tx.wallet.update({
                where: { id: originalTransaction.walletId },
                data: {
                    balance: {
                        increment: netChange
                    }
                }
            });

            return updatedTransaction;
        });

        res.json({
            success: true,
            message: 'Transaction updated successfully',
            data: result
        });

    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({
            error: 'Failed to update transaction',
            message: error.message
        });
    }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        // Get transaction before deleting to adjust wallet balance
        const transaction = await prisma.transaction.findUnique({
            where: { id: parseInt(id) }
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Use Prisma transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // Delete the transaction
            await tx.transaction.delete({
                where: { id: parseInt(id) }
            });

            // Revert the wallet balance
            const balanceChange = transaction.type === 'income'
                ? -parseFloat(transaction.amount)
                : parseFloat(transaction.amount);

            await tx.wallet.update({
                where: { id: transaction.walletId },
                data: {
                    balance: {
                        increment: balanceChange
                    }
                }
            });
        });

        res.json({
            success: true,
            message: 'Transaction deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({
            error: 'Failed to delete transaction',
            message: error.message
        });
    }
};

// Bulk create transactions (for offline sync)
export const bulkCreateTransactions = async (req, res) => {
    try {
        const { transactions } = req.body;

        if (!Array.isArray(transactions) || transactions.length === 0) {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'transactions must be a non-empty array'
            });
        }

        const results = [];
        const errors = [];

        // Process each transaction
        for (const txData of transactions) {
            try {
                const result = await prisma.$transaction(async (tx) => {
                    const transaction = await tx.transaction.create({
                        data: {
                            userId: parseInt(txData.userId),
                            walletId: parseInt(txData.walletId),
                            categoryId: parseInt(txData.categoryId),
                            amount: parseFloat(txData.amount),
                            date: new Date(txData.date),
                            type: txData.type,
                            note: txData.note || null,
                        },
                    });

                    const balanceChange = txData.type === 'income'
                        ? parseFloat(txData.amount)
                        : -parseFloat(txData.amount);

                    await tx.wallet.update({
                        where: { id: parseInt(txData.walletId) },
                        data: {
                            balance: {
                                increment: balanceChange
                            }
                        }
                    });

                    return transaction;
                });

                results.push(result);
            } catch (error) {
                errors.push({
                    transaction: txData,
                    error: error.message
                });
            }
        }

        res.status(201).json({
            success: true,
            message: `Processed ${transactions.length} transactions`,
            created: results.length,
            failed: errors.length,
            data: results,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error('Error in bulk create:', error);
        res.status(500).json({
            error: 'Failed to process bulk transactions',
            message: error.message
        });
    }
};
