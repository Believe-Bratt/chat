# ChatConnect Monorepo

ChatConnect is a cross-platform messaging app (Flutter) with a Node.js + Express + MongoDB backend, Socket.IO real-time communication, WebRTC calling, FCM push notifications, and a React Admin Panel.

## Structure

- `server/` Node.js + Express + MongoDB API + Socket.IO + FCM + media uploads (S3)
- `mobile/` Flutter app (Android & iOS)
- `admin/` React + Tailwind Admin panel
- `docs/` Docs and API reference

## Features Implemented (MVP)

- Firebase Phone Auth on mobile; backend verifies Firebase ID tokens
- User profile in MongoDB (phone, username, avatar, status, lastSeen, online)
- Contact discovery by phone numbers
- One-to-one chat: text + media stubs, typing, read receipts
- Groups: create, add/remove members, admins, profile
- WebRTC signaling over Socket.IO (offer/answer/ICE), call logs
- Status/Stories CRUD with 24h expiry
- Push notifications via FCM for messages and calls
- Admin panel with login + TOTP 2FA, dashboard, users, reports, analytics (basic)
- E2E encryption scaffolding (Signal-style key management endpoints, client-side stubs)

## Prerequisites

- Node.js >= 18, npm >= 9
- MongoDB (local or Atlas)
- Firebase project (Auth + Cloud Messaging). Service account JSON
- AWS S3 bucket (or comment out S3 to use local disk in development)
- Flutter SDK 3.22+ (for mobile)

## Quick Start

### 1) Backend

1. Copy `server/.env.example` to `server/.env` and fill values.
2. Install deps and run:

```bash
cd server
npm install
npm run dev
```

The API runs on `http://localhost:8080` (WS on same host).

### 2) Admin Panel

```bash
cd admin
npm install
npm run dev
```

Open the printed local URL.

### 3) Mobile (Flutter)

1. Ensure you configured Firebase for Android and iOS.
2. Add the `google-services.json` (Android) and `GoogleService-Info.plist` (iOS).
3. Install deps and run:

```bash
cd mobile
flutter pub get
flutter run
```

## Environment Variables

See `server/.env.example` for all variables, including:

- `MONGO_URI`
- `PORT`
- `CORS_ORIGIN`
- `JWT_SECRET` (admin only)
- Firebase Admin: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- FCM: uses the same Firebase Admin credential
- AWS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `AWS_S3_REGION`

## Notes on E2E Encryption

- The backend stores only ciphertext and media object references.
- Clients manage identity and pre-keys; server exposes endpoints to publish and fetch peer public keys.
- This repository includes client stubs using Signal-like flows. Complete hardened E2E requires careful key storage, session management, and audits.

## Security & Production

- Use HTTPS and secure WebSocket (WSS)
- Store only encrypted media in S3; keys must never leave devices
- Harden CORS, rate limiting, and request validation
- Deploy with a process manager and horizontal scaling (Socket.IO adapter for Redis)

## Licensing

For demonstration and educational purposes. Review and harden before production use.