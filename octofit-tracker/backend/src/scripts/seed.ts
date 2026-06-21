import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Team Aloha', coach: 'Mia Harper' },
    { name: 'Team Velocity', coach: 'Noah Reed' }
  ]);

  const users = await User.create([
    { name: 'Ava Collins', email: 'ava.collins@example.com', role: 'user', teamId: teams[0]._id },
    { name: 'Liam Brooks', email: 'liam.brooks@example.com', role: 'coach', teamId: teams[1]._id },
    { name: 'Sophia Reed', email: 'sophia.reed@example.com', role: 'user', teamId: teams[1]._id }
  ]);

  teams[0].members = [users[0]._id];
  teams[1].members = [users[1]._id, users[2]._id];
  await Promise.all(teams.map((team) => team.save()));

  const activities = await Activity.create([
    { userId: users[0]._id, type: 'cycling', durationMinutes: 45, caloriesBurned: 420, performedAt: new Date() },
    { userId: users[1]._id, type: 'strength training', durationMinutes: 60, caloriesBurned: 510, performedAt: new Date() },
    { userId: users[2]._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 180, performedAt: new Date() }
  ]);

  const leaderboardEntries = await Leaderboard.create([
    { userId: users[0]._id, teamId: teams[0]._id, score: 1240, rank: 1 },
    { userId: users[1]._id, teamId: teams[1]._id, score: 1120, rank: 2 },
    { userId: users[2]._id, teamId: teams[1]._id, score: 980, rank: 3 }
  ]);

  const workouts = await Workout.create([
    { name: 'Morning HIIT Blast', durationMinutes: 25, difficulty: 'intermediate', category: 'cardio' },
    { name: 'Full Body Strength', durationMinutes: 50, difficulty: 'advanced', category: 'strength' },
    { name: 'Recovery Yoga Flow', durationMinutes: 35, difficulty: 'beginner', category: 'flexibility' }
  ]);

  console.log('Seeding complete');
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboardEntries.length,
    workouts: workouts.length
  });

  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
