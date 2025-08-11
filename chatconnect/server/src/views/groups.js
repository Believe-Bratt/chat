import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { requireAuth } from '../middleware/auth.js';
import Group from '../models/Group.js';

export const groupsRouter = express.Router();

groupsRouter.post('/', requireAuth, async (req, res) => {
  const { name, members, avatarUrl } = req.body;
  const group = await Group.create({ groupId: uuidv4(), name, members: Array.from(new Set([req.user.uid, ...(members || [])])), admins: [req.user.uid], avatarUrl, createdBy: req.user.uid });
  res.json({ group });
});

groupsRouter.put('/:groupId', requireAuth, async (req, res) => {
  const group = await Group.findOne({ groupId: req.params.groupId });
  if (!group) return res.status(404).json({ error: 'not found' });
  if (!group.admins.includes(req.user.uid)) return res.status(403).json({ error: 'forbidden' });
  const { name, avatarUrl } = req.body;
  if (name) group.name = name;
  if (avatarUrl) group.avatarUrl = avatarUrl;
  await group.save();
  res.json({ group });
});

groupsRouter.post('/:groupId/add', requireAuth, async (req, res) => {
  const group = await Group.findOne({ groupId: req.params.groupId });
  if (!group) return res.status(404).json({ error: 'not found' });
  if (!group.admins.includes(req.user.uid)) return res.status(403).json({ error: 'forbidden' });
  const { uids } = req.body;
  group.members = Array.from(new Set([...(group.members || []), ...(uids || [])]));
  await group.save();
  res.json({ group });
});

groupsRouter.post('/:groupId/remove', requireAuth, async (req, res) => {
  const group = await Group.findOne({ groupId: req.params.groupId });
  if (!group) return res.status(404).json({ error: 'not found' });
  if (!group.admins.includes(req.user.uid)) return res.status(403).json({ error: 'forbidden' });
  const { uid } = req.body;
  group.members = group.members.filter((m) => m !== uid);
  group.admins = group.admins.filter((m) => m !== uid);
  await group.save();
  res.json({ group });
});