import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Status from '../models/Status.js';

export const statusRouter = express.Router();

statusRouter.post('/', requireAuth, async (req, res) => {
  const { type, text, mediaUrl, audience, exceptUids, onlyUids } = req.body;
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
  const status = await Status.create({ ownerUid: req.user.uid, type, text, mediaUrl, audience, exceptUids, onlyUids, expiresAt });
  res.json({ status });
});

statusRouter.get('/feed', requireAuth, async (req, res) => {
  const now = new Date();
  const statuses = await Status.find({ expiresAt: { $gt: now } }).sort({ createdAt: -1 }).limit(200);
  res.json({ statuses });
});