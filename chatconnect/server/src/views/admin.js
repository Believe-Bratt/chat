import express from 'express';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/User.js';
import Message from '../models/Message.js';

export const adminRouter = express.Router();

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev');
    if (!payload.isAdmin) return res.status(403).json({ error: 'forbidden' });
    req.admin = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// For demo, treat any existing user with isAdmin=true as admin identity
adminRouter.post('/login', async (req, res) => {
  const { uid, totp } = req.body; // uid of admin user
  const user = await User.findOne({ uid, isAdmin: true });
  if (!user) return res.status(401).json({ error: 'not admin' });
  // In production, store per-admin TOTP secret; for demo, derive a deterministic secret
  const secret = (process.env.JWT_SECRET || 'dev') + uid;
  const verified = speakeasy.totp.verify({ secret, encoding: 'ascii', token: String(totp || '') });
  if (!verified) return res.status(401).json({ error: 'invalid 2fa' });
  const token = jwt.sign({ isAdmin: true, uid }, process.env.JWT_SECRET || 'dev', { expiresIn: '8h' });
  res.json({ token });
});

adminRouter.get('/totp-qr', async (req, res) => {
  const { uid } = req.query; // admin uid
  const secret = (process.env.JWT_SECRET || 'dev') + uid;
  const otpauth = speakeasy.otpauthURL({ secret, label: `ChatConnect:${uid}`, encoding: 'ascii' });
  const img = await qrcode.toDataURL(otpauth);
  res.json({ img });
});

adminRouter.get('/dashboard', requireAdmin, async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const activeUsers = await User.countDocuments({ online: true });
  const messagesLast7 = await Message.aggregate([
    { $match: { createdAt: { $gte: new Date(Date.now() - 7*24*3600*1000) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({ totalUsers, activeUsers, messagesLast7 });
});

adminRouter.get('/users', requireAdmin, async (req, res) => {
  const users = await User.find({}, { uid: 1, username: 1, phoneNumber: 1, online: 1 }).limit(200).sort({ createdAt: -1 });
  res.json({ users });
});

adminRouter.post('/users/:uid/deactivate', requireAdmin, async (req, res) => {
  await User.updateOne({ uid: req.params.uid }, { $set: { deactivated: true } });
  res.json({ ok: true });
});

adminRouter.post('/users/:uid/ban', requireAdmin, async (req, res) => {
  await User.updateOne({ uid: req.params.uid }, { $set: { banned: true } });
  res.json({ ok: true });
});