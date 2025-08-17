import User from '../models/User.js';

export function registerPresenceHandlers(io, socket) {
  const uid = socket.data.uid;
  if (!uid) return;

  socket.join(uid); // allow direct emits by uid

  // Mark online
  User.updateOne({ uid }, { $set: { online: true } }).exec();
  socket.broadcast.emit('presence:update', { uid, online: true });

  socket.on('disconnect', async () => {
    const lastSeen = new Date();
    await User.updateOne({ uid }, { $set: { online: false, lastSeenAt: lastSeen } });
    socket.broadcast.emit('presence:update', { uid, online: false, lastSeenAt: lastSeen });
  });
}