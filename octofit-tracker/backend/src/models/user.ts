import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['user', 'coach', 'admin'], default: 'user' },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: false },
  joinedAt: { type: Date, default: () => new Date() }
});

export default model('User', userSchema);
