import mongoose from 'mongoose';

const CallLogSchema = new mongoose.Schema({
  callerUid: { type: String, index: true },
  calleeUid: { type: String, index: true },
  type: { type: String, enum: ['audio', 'video'], required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  durationSec: { type: Number, default: 0 },
  status: { type: String, enum: ['missed', 'declined', 'completed'], default: 'completed' }
}, { timestamps: true });

export default mongoose.model('CallLog', CallLogSchema);