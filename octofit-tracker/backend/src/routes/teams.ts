import { Router } from 'express';
import Team from '../models/team.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ message: 'Teams endpoint', teams });
});

export default router;
