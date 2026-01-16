// backend/src/controllers/walletController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all wallets for a user
export const getWallets = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const wallets = await prisma.wallet.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'asc' }
        });

        res.json({
            success: true,
            count: wallets.length,
            data: wallets
        });

    } catch (error) {
        console.error('Error fetching wallets:', error);
        res.status(500).json({
            error: 'Failed to fetch wallets',
            message: error.message
        });
    }
};

// Create a new wallet
export const createWallet = async (req, res) => {
    try {
        const { userId, name, type, balance, icon, color } = req.body;

        if (!userId || !name || !type) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['userId', 'name', 'type']
            });
        }

        const wallet = await prisma.wallet.create({
            data: {
                userId: parseInt(userId),
                name,
                type,
                balance: balance ? parseFloat(balance) : 0,
                icon,
                color
            }
        });

        res.status(201).json({
            success: true,
            message: 'Wallet created successfully',
            data: wallet
        });

    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({
            error: 'Failed to create wallet',
            message: error.message
        });
    }
};

// Update a wallet
export const updateWallet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, icon, color } = req.body;

        const wallet = await prisma.wallet.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(type && { type }),
                ...(icon !== undefined && { icon }),
                ...(color !== undefined && { color })
            }
        });

        res.json({
            success: true,
            message: 'Wallet updated successfully',
            data: wallet
        });

    } catch (error) {
        console.error('Error updating wallet:', error);
        res.status(500).json({
            error: 'Failed to update wallet',
            message: error.message
        });
    }
};

// Delete a wallet
export const deleteWallet = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.wallet.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Wallet deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting wallet:', error);
        res.status(500).json({
            error: 'Failed to delete wallet',
            message: error.message
        });
    }
};

// Get wallet balance
export const getWalletBalance = async (req, res) => {
    try {
        const { id } = req.params;

        const wallet = await prisma.wallet.findUnique({
            where: { id: parseInt(id) },
            select: { id: true, name: true, balance: true }
        });

        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        res.json({
            success: true,
            data: wallet
        });

    } catch (error) {
        console.error('Error fetching wallet balance:', error);
        res.status(500).json({
            error: 'Failed to fetch wallet balance',
            message: error.message
        });
    }
};
