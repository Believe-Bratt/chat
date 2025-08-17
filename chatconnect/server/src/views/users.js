import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';

export const usersRouter = express.Router();

// POST /users/lookup { phoneNumbers: ["+15551234567", ...] }
usersRouter.post('/lookup', requireAuth, async (req, res) => {
  const phones = Array.isArray(req.body.phoneNumbers) ? req.body.phoneNumbers : [];
  if (!phones.length) return res.json({ users: [] });
  const users = await User.find({ phoneNumber: { $in: phones } }, { uid: 1, phoneNumber: 1, username: 1, avatarUrl: 1, statusText: 1, online: 1, lastSeenAt: 1 });
  res.json({ users });
});

usersRouter.get('/search', requireAuth, async (req, res) => {
  const q = (req.query.q || '').toString();
  if (!q) return res.json({ users: [] });
  const users = await User.find({ username: { $regex: q, $options: 'i' } }).limit(20);
  res.json({ users });
});

usersRouter.post('/block', requireAuth, async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: 'uid required' });
  if (!req.user.blockedUserUids.includes(uid)) req.user.blockedUserUids.push(uid);
  await req.user.save();
  res.json({ ok: true });
});

usersRouter.post('/unblock', requireAuth, async (req, res) => {
  const { uid } = req.body;
  req.user.blockedUserUids = req.user.blockedUserUids.filter((x) => x !== uid);
  await req.user.save();
  res.json({ ok: true });
});