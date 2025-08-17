import mongoose from 'mongoose';

const DeviceTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  platform: { type: String, enum: ['android', 'ios', 'web'], default: 'android' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const SignalKeySchema = new mongoose.Schema({
  identityKey: { type: String },
  signedPreKey: { type: Object },
  oneTimePreKeys: { type: [Object], default: [] },
  lastUpdatedAt: { type: Date, default: Date.now }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  uid: { type: String, index: true, unique: true },
  phoneNumber: { type: String, index: true },
  username: { type: String, index: true },
  avatarUrl: { type: String },
  statusText: { type: String, default: '' },
  lastSeenAt: { type: Date },
  online: { type: Boolean, default: false },
  blockedUserUids: { type: [String], default: [] },
  deviceTokens: { type: [DeviceTokenSchema], default: [] },
  signalKeys: { type: SignalKeySchema, default: {} },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);