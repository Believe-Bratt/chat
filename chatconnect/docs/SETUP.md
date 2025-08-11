# ChatConnect Setup

## Backend

- Copy `server/.env.example` to `.env` and set MongoDB URI, Firebase admin credentials, JWT secret, and optional AWS S3 settings.
- Install deps and run `npm run dev` in `server/`.

## Mobile

- Create a Firebase project and enable Phone Auth and FCM.
- Add `google-services.json` under `android/app/` and `GoogleService-Info.plist` under `ios/Runner/`.
- In `mobile/`, run `flutter pub get` and `flutter run`.

## Admin Panel

- In `admin/`, run `npm install` and `npm run dev`.
- The admin panel proxies API requests to `http://localhost:8080` under `/api`.

## Notes

- For WebRTC, you need STUN/TURN servers in production (e.g., Google STUN, Coturn for TURN).
- For Socket.IO at scale, configure a Redis adapter and sticky sessions.
- End-to-end encryption requires client-side Signal Protocol implementation.