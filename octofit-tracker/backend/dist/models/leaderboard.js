import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() }
});
export default model('Leaderboard', leaderboardSchema);
