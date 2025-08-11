import { getFirebaseAdmin } from '../setup/firebase.js';
import User from '../models/User.js';

export async function sendPushToUids(uids, data) {
  try {
    const users = await User.find({ uid: { $in: uids } }, { deviceTokens: 1 });
    const tokens = users.flatMap((u) => (u.deviceTokens || []).map((t) => t.token));
    if (!tokens.length) return;
    const admin = getFirebaseAdmin();
    await admin.messaging().sendEachForMulticast({ tokens, data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) });
  } catch (e) {
    console.warn('Push send failed', e.message);
  }
}