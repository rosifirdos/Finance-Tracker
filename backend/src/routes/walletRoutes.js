// backend/src/routes/walletRoutes.js

import express from 'express';
import {
    getWallets,
    createWallet,
    updateWallet,
    deleteWallet,
    getWalletBalance
} from '../controllers/walletController.js';

const router = express.Router();

router.get('/', getWallets);
router.post('/', createWallet);
router.put('/:id', updateWallet);
router.delete('/:id', deleteWallet);
router.get('/:id/balance', getWalletBalance);

export default router;
