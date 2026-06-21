import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';
const router = Router();
router.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard.find().populate('userId teamId').lean();
    res.json({ message: 'Leaderboard endpoint', leaderboard });
});
export default router;
