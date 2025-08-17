import admin from 'firebase-admin';

let initialized = false;

export async function initFirebaseAdmin() {
  if (initialized) return admin;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[firebase] Missing admin credentials; push notifications and token verification will not work.');
    return null;
  }

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey })
  });

  initialized = true;
  return admin;
}

export function getFirebaseAdmin() {
  if (!initialized) throw new Error('Firebase admin not initialized');
  return admin;
}