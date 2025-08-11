import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  groupId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  avatarUrl: { type: String },
  admins: { type: [String], default: [] },
  members: { type: [String], default: [] },
  createdBy: { type: String },
}, { timestamps: true });

export default mongoose.model('Group', GroupSchema);