import {Router} from 'express';

import authRoutes from './auth.routes.js';
import estateRoutes from './estates.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/estates', estateRoutes);

export default router;