// backend/src/routes/transactionRoutes.js

import express from 'express';
import {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    bulkCreateTransactions
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', createTransaction);
router.post('/bulk', bulkCreateTransactions);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
