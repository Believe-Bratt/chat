import CallLog from '../models/CallLog.js';

export function registerCallSocket(io, socket) {
  socket.on('call:offer', async ({ toUid, sdp, type }) => {
    const fromUid = socket.data.uid;
    io.to(toUid).emit('call:offer', { fromUid, sdp, type });
  });

  socket.on('call:answer', ({ toUid, sdp }) => {
    const fromUid = socket.data.uid;
    io.to(toUid).emit('call:answer', { fromUid, sdp });
  });

  socket.on('call:ice', ({ toUid, candidate }) => {
    const fromUid = socket.data.uid;
    io.to(toUid).emit('call:ice', { fromUid, candidate });
  });

  socket.on('call:end', async ({ toUid, status, startedAt }) => {
    const fromUid = socket.data.uid;
    const endedAt = new Date();
    const durationSec = startedAt ? Math.floor((endedAt - new Date(startedAt)) / 1000) : 0;
    await CallLog.create({ callerUid: fromUid, calleeUid: toUid, type: 'video', status: status || 'completed', startedAt: startedAt ? new Date(startedAt) : new Date(), endedAt, durationSec });
    io.to(toUid).emit('call:end', { fromUid, status });
  });
}