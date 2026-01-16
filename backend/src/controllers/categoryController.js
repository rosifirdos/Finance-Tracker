// backend/src/controllers/categoryController.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all categories for a user
export const getCategories = async (req, res) => {
    try {
        const { userId, type } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const where = { userId: parseInt(userId) };
        if (type) where.type = type;

        const categories = await prisma.category.findMany({
            where,
            orderBy: { name: 'asc' }
        });

        res.json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            error: 'Failed to fetch categories',
            message: error.message
        });
    }
};

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { userId, name, type, icon, color } = req.body;

        if (!userId || !name || !type) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['userId', 'name', 'type']
            });
        }

        if (type !== 'income' && type !== 'expense') {
            return res.status(400).json({
                error: 'Invalid type',
                message: 'Type must be either "income" or "expense"'
            });
        }

        const category = await prisma.category.create({
            data: {
                userId: parseInt(userId),
                name,
                type,
                icon,
                color
            }
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });

    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            error: 'Failed to create category',
            message: error.message
        });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, icon, color } = req.body;

        const category = await prisma.category.update({
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
            message: 'Category updated successfully',
            data: category
        });

    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            error: 'Failed to update category',
            message: error.message
        });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.category.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            error: 'Failed to delete category',
            message: error.message
        });
    }
};
