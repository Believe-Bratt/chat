import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatType: { type: String, enum: ['direct', 'group'], required: true },
  chatId: { type: String, required: true, index: true },
  senderUid: { type: String, required: true, index: true },
  recipientUid: { type: String },
  groupId: { type: String },

  // Ciphertext payload; plaintext never stored
  ciphertext: { type: String, required: true },
  contentType: { type: String, enum: ['text', 'image', 'video', 'audio', 'file'], default: 'text' },
  mediaUrl: { type: String },
  mediaThumbUrl: { type: String },

  sentAt: { type: Date, default: Date.now },
  deliveredTo: { type: [String], default: [] },
  readBy: { type: [String], default: [] },
  deletedFor: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);