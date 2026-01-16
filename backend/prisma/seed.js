// backend/prisma/seed.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create a test user
    const user = await prisma.user.upsert({
        where: { email: 'demo@finance.app' },
        update: {},
        create: {
            username: 'demo',
            email: 'demo@finance.app',
        },
    });
    console.log('✅ Created user:', user.username);

    // Create wallets
    const cashWallet = await prisma.wallet.upsert({
        where: { id: 1 },
        update: {},
        create: {
            userId: user.id,
            name: 'Cash',
            type: 'cash',
            balance: 500,
            icon: '💵',
            color: '#10b981',
        },
    });

    const bankWallet = await prisma.wallet.upsert({
        where: { id: 2 },
        update: {},
        create: {
            userId: user.id,
            name: 'Bank Account',
            type: 'bank',
            balance: 5000,
            icon: '🏦',
            color: '#3b82f6',
        },
    });

    const eWallet = await prisma.wallet.upsert({
        where: { id: 3 },
        update: {},
        create: {
            userId: user.id,
            name: 'E-Wallet',
            type: 'ewallet',
            balance: 250,
            icon: '📱',
            color: '#8b5cf6',
        },
    });

    console.log('✅ Created wallets: Cash, Bank Account, E-Wallet');

    // Create expense categories
    const foodCategory = await prisma.category.upsert({
        where: { id: 1 },
        update: {},
        create: {
            userId: user.id,
            name: 'Food & Dining',
            type: 'expense',
            icon: '🍔',
            color: '#ef4444',
            isDefault: true,
        },
    });

    const transportCategory = await prisma.category.upsert({
        where: { id: 2 },
        update: {},
        create: {
            userId: user.id,
            name: 'Transportation',
            type: 'expense',
            icon: '🚗',
            color: '#f59e0b',
            isDefault: true,
        },
    });

    const shoppingCategory = await prisma.category.upsert({
        where: { id: 3 },
        update: {},
        create: {
            userId: user.id,
            name: 'Shopping',
            type: 'expense',
            icon: '🛍️',
            color: '#ec4899',
            isDefault: true,
        },
    });

    const billsCategory = await prisma.category.upsert({
        where: { id: 4 },
        update: {},
        create: {
            userId: user.id,
            name: 'Bills & Utilities',
            type: 'expense',
            icon: '📄',
            color: '#6366f1',
            isDefault: true,
        },
    });

    const entertainmentCategory = await prisma.category.upsert({
        where: { id: 5 },
        update: {},
        create: {
            userId: user.id,
            name: 'Entertainment',
            type: 'expense',
            icon: '🎮',
            color: '#8b5cf6',
            isDefault: true,
        },
    });

    // Create income categories
    const salaryCategory = await prisma.category.upsert({
        where: { id: 6 },
        update: {},
        create: {
            userId: user.id,
            name: 'Salary',
            type: 'income',
            icon: '💰',
            color: '#10b981',
            isDefault: true,
        },
    });

    const freelanceCategory = await prisma.category.upsert({
        where: { id: 7 },
        update: {},
        create: {
            userId: user.id,
            name: 'Freelance',
            type: 'income',
            icon: '💼',
            color: '#14b8a6',
            isDefault: true,
        },
    });

    const investmentCategory = await prisma.category.upsert({
        where: { id: 8 },
        update: {},
        create: {
            userId: user.id,
            name: 'Investment',
            type: 'income',
            icon: '📈',
            color: '#06b6d4',
            isDefault: true,
        },
    });

    console.log('✅ Created 8 categories (5 expense, 3 income)');

    // Create some sample transactions (last 7 days)
    const now = new Date();
    const transactions = [
        // Today
        {
            userId: user.id,
            walletId: cashWallet.id,
            categoryId: foodCategory.id,
            type: 'expense',
            amount: 25.50,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            note: 'Lunch at cafe',
        },
        // Yesterday
        {
            userId: user.id,
            walletId: eWallet.id,
            categoryId: transportCategory.id,
            type: 'expense',
            amount: 15.00,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
            note: 'Taxi to office',
        },
        // 3 days ago
        {
            userId: user.id,
            walletId: bankWallet.id,
            categoryId: shoppingCategory.id,
            type: 'expense',
            amount: 89.99,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
            note: 'New shoes',
        },
        // 5 days ago - Income
        {
            userId: user.id,
            walletId: bankWallet.id,
            categoryId: salaryCategory.id,
            type: 'income',
            amount: 3500.00,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
            note: 'Monthly salary',
        },
        // 6 days ago
        {
            userId: user.id,
            walletId: cashWallet.id,
            categoryId: entertainmentCategory.id,
            type: 'expense',
            amount: 45.00,
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
            note: 'Movie tickets',
        },
    ];

    for (const txData of transactions) {
        await prisma.transaction.create({
            data: txData,
        });
    }

    console.log(`✅ Created ${transactions.length} sample transactions`);

    console.log('🎉 Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   User: ${user.email}`);
    console.log(`   Wallets: 3 (Cash: $${cashWallet.balance}, Bank: $${bankWallet.balance}, E-Wallet: $${eWallet.balance})`);
    console.log(`   Categories: 8 (5 expense, 3 income)`);
    console.log(`   Transactions: ${transactions.length}`);
    console.log('\n💡 You can now test the API with userId:', user.id);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
