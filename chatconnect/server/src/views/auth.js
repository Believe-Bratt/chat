import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';

export const authRouter = express.Router();

// Register or update profile after Firebase sign-in
authRouter.post('/register', requireAuth, async (req, res) => {
  const { username, avatarUrl, statusText } = req.body;
  const user = req.user;
  if (typeof username === 'string') user.username = username;
  if (typeof avatarUrl === 'string') user.avatarUrl = avatarUrl;
  if (typeof statusText === 'string') user.statusText = statusText;
  await user.save();
  res.json({ user });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

authRouter.put('/me', requireAuth, async (req, res) => {
  const fields = ['username', 'avatarUrl', 'statusText'];
  fields.forEach((f) => { if (req.body[f] !== undefined) req.user[f] = req.body[f]; });
  await req.user.save();
  res.json({ user: req.user });
});

// Device token for FCM
authRouter.post('/device-token', requireAuth, async (req, res) => {
  const { token, platform } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });
  const exists = req.user.deviceTokens.some((t) => t.token === token);
  if (!exists) {
    req.user.deviceTokens.push({ token, platform: platform || 'android' });
    await req.user.save();
  }
  res.json({ ok: true });
});

// Signal-like key publishing (public only)
authRouter.post('/signal/keys', requireAuth, async (req, res) => {
  const { identityKey, signedPreKey, oneTimePreKeys } = req.body;
  req.user.signalKeys = {
    identityKey: identityKey || req.user.signalKeys.identityKey,
    signedPreKey: signedPreKey || req.user.signalKeys.signedPreKey,
    oneTimePreKeys: oneTimePreKeys || req.user.signalKeys.oneTimePreKeys,
    lastUpdatedAt: new Date()
  };
  await req.user.save();
  res.json({ ok: true });
});

authRouter.get('/signal/keys/:uid', requireAuth, async (req, res) => {
  const other = await User.findOne({ uid: req.params.uid }, { signalKeys: 1, uid: 1, username: 1 });
  if (!other) return res.status(404).json({ error: 'not found' });
  res.json({ uid: other.uid, username: other.username, keys: other.signalKeys });
});