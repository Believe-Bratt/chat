import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import { initFirebaseAdmin, getFirebaseAdmin } from './setup/firebase.js';
import { initMemoryMongoIfNeeded } from './setup/memory-mongo.js';
import { authRouter } from './views/auth.js';
import { usersRouter } from './views/users.js';
import { groupsRouter } from './views/groups.js';
import { messagesRouter } from './views/messages.js';
import { statusRouter } from './views/status.js';
import { callsRouter } from './views/calls.js';
import { adminRouter } from './views/admin.js';
import { registerChatSocket } from './sockets/chat.js';
import { registerCallSocket } from './sockets/call.js';
import { registerPresenceHandlers } from './sockets/presence.js';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: (process.env.CORS_ORIGIN || '*').split(','),
    credentials: true,
  }
});

// Global middlewares
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || '*').split(','), credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve local uploads in dev
const localUploadDir = '/tmp/uploads';
try { fs.mkdirSync(localUploadDir, { recursive: true }); } catch {}
app.use('/uploads', express.static(localUploadDir));

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Setup Firebase and MongoDB
await initFirebaseAdmin();
await initMemoryMongoIfNeeded();
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/chatconnect';
await mongoose.connect(mongoUri);

// Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/messages', messagesRouter);
app.use('/status', statusRouter);
app.use('/calls', callsRouter);
app.use('/admin', adminRouter);

// Socket auth middleware
io.use(async (socket, next) => {
  try {
    const devBypass = process.env.DEV_ALLOW_INSECURE_AUTH === 'true';
    const idToken = socket.handshake.auth?.idToken;
    if (!idToken) {
      if (devBypass) {
        socket.data.uid = socket.handshake.auth?.uid || 'dev-user';
        return next();
      }
      return next(new Error('unauthorized'));
    }
    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(idToken);
    socket.data.uid = decoded.uid;
    next();
  } catch (e) {
    next(e);
  }
});

// Sockets
io.on('connection', (socket) => {
  registerPresenceHandlers(io, socket);
  registerChatSocket(io, socket);
  registerCallSocket(io, socket);
});

const port = Number(process.env.PORT || 8080);
server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});