import { getFirebaseAdmin } from '../setup/firebase.js';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      // Allow lazy creation; client should call /auth/register to set profile
      user = await User.create({ uid: decoded.uid, phoneNumber: decoded.phone_number, username: '', statusText: '', online: false });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}