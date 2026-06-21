import { Router } from 'express';
import Workout from '../models/workout.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ message: 'Workouts endpoint', workouts });
});

export default router;
