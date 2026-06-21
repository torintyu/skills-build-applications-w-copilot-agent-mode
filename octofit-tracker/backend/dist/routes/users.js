import { Router } from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find().lean();
    res.json({ message: 'Users endpoint', users });
});
export default router;
