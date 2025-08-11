import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import Message from '../models/Message.js';
import { createUploader } from '../setup/upload.js';

export const messagesRouter = express.Router();

const uploader = createUploader();

messagesRouter.post('/upload', requireAuth, uploader.single('file'), async (req, res) => {
  // Respond with URL depending on storage
  let url = '';
  if (req.file && req.file.location) {
    url = req.file.location; // S3
  } else if (req.file && req.file.path) {
    const filename = req.file.filename;
    url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
  }
  res.json({ url });
});

// Search messages by keyword in ciphertext metadata (client should index locally; this is a stub)
messagesRouter.get('/search', requireAuth, async (req, res) => {
  const q = (req.query.q || '').toString();
  if (!q) return res.json({ messages: [] });
  const msgs = await Message.find({ ciphertext: { $regex: q, $options: 'i' }, chatType: 'direct' }).limit(50);
  res.json({ messages: msgs });
});

// Delete message for self or for everyone
messagesRouter.post('/delete', requireAuth, async (req, res) => {
  const { messageId, forEveryone } = req.body;
  const msg = await Message.findById(messageId);
  if (!msg) return res.status(404).json({ error: 'not found' });
  if (forEveryone) {
    msg.ciphertext = '';
    msg.contentType = 'text';
    await msg.save();
  } else {
    if (!msg.deletedFor.includes(req.user.uid)) msg.deletedFor.push(req.user.uid);
    await msg.save();
  }
  res.json({ ok: true });
});