import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    category: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() }
});
export default model('Workout', workoutSchema);
