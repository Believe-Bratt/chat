import Message from '../models/Message.js';
import User from '../models/User.js';
import { sendPushToUids } from '../util/push.js';

function directRoomFor(u1, u2) {
  return ['direct', ...[u1, u2].sort()].join(':');
}

export function registerChatSocket(io, socket) {
  socket.on('chat:join', async ({ peerUid }) => {
    const userUid = socket.data.uid;
    if (!userUid || !peerUid) return;
    const room = directRoomFor(userUid, peerUid);
    socket.join(room);
  });

  socket.on('chat:typing', ({ peerUid, typing }) => {
    const userUid = socket.data.uid;
    const room = directRoomFor(userUid, peerUid);
    socket.to(room).emit('chat:typing', { from: userUid, typing: !!typing });
  });

  socket.on('chat:send', async (payload, ack) => {
    try {
      const userUid = socket.data.uid;
      const { chatType, peerUid, groupId, ciphertext, contentType, mediaUrl } = payload;
      let chatId;
      if (chatType === 'direct') {
        chatId = directRoomFor(userUid, peerUid);
      } else {
        chatId = `group:${groupId}`;
      }
      const msg = await Message.create({
        chatType,
        chatId,
        senderUid: userUid,
        recipientUid: peerUid,
        groupId,
        ciphertext,
        contentType,
        mediaUrl,
      });
      io.to(chatId).emit('chat:message', { message: msg });
      // Push notify recipient(s)
      const recipientUids = chatType === 'direct' ? [peerUid] : [];
      if (recipientUids.length) await sendPushToUids(recipientUids, { type: 'message', from: userUid });
      ack && ack({ ok: true, id: msg._id.toString(), sentAt: msg.createdAt });
    } catch (e) {
      console.error('send error', e);
      ack && ack({ ok: false });
    }
  });

  socket.on('chat:delivered', async ({ messageId }) => {
    const userUid = socket.data.uid;
    const msg = await Message.findById(messageId);
    if (!msg) return;
    if (!msg.deliveredTo.includes(userUid)) msg.deliveredTo.push(userUid);
    await msg.save();
  });

  socket.on('chat:read', async ({ messageId }) => {
    const userUid = socket.data.uid;
    const msg = await Message.findById(messageId);
    if (!msg) return;
    if (!msg.readBy.includes(userUid)) msg.readBy.push(userUid);
    await msg.save();
    io.to(msg.chatId).emit('chat:read', { messageId, by: userUid });
  });
}