import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    const activities = await Activity.find().populate('userId').lean();
    res.json({ message: 'Activities endpoint', activities });
});
export default router;
