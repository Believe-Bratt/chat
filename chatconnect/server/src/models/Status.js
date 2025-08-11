import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema({
  ownerUid: { type: String, index: true },
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  text: { type: String },
  mediaUrl: { type: String },
  audience: { type: String, enum: ['contacts', 'contacts_except', 'only_share_with'], default: 'contacts' },
  exceptUids: { type: [String], default: [] },
  onlyUids: { type: [String], default: [] },
  expiresAt: { type: Date, index: true }
}, { timestamps: true });

export default mongoose.model('Status', StatusSchema);