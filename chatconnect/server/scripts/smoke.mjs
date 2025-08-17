import axios from 'axios';

const base = process.env.BASE_URL || 'http://localhost:8080';

async function main() {
  const client = axios.create({ baseURL: base, headers: { Authorization: 'Bearer dev' } });
  const me = await client.post('/auth/register', { username: 'Dev User', statusText: 'Hello' }).then(r => r.data.user.username);
  const lookup = await client.post('/users/lookup', { phoneNumbers: ['+10000000000'] }).then(r => r.data.users.length);
  const group = await client.post('/groups', { name: 'Smoke Group', members: [] }).then(r => r.data.group.groupId);
  const status = await client.post('/status', { type: 'text', text: 'Smoke test' }).then(r => r.data.status.type);
  const media = await client.post('/messages/upload', new FormData(), { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.url).catch(()=> '');
  console.log(JSON.stringify({ ok: true, me, lookup, group, status, mediaPresent: !!media }));
}

main().catch(err => { console.error(err.message); process.exit(1); });