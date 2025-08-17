import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import CallLog from '../models/CallLog.js';

export const callsRouter = express.Router();

callsRouter.get('/logs', requireAuth, async (req, res) => {
  const logs = await CallLog.find({ $or: [{ callerUid: req.user.uid }, { calleeUid: req.user.uid }] }).sort({ createdAt: -1 }).limit(100);
  res.json({ logs });
});