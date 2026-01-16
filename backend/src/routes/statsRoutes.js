// backend/src/routes/statsRoutes.js

import express from 'express';
import {
    getOverview,
    getCategoryBreakdown
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/overview', getOverview);
router.get('/category-breakdown', getCategoryBreakdown);

export default router;
