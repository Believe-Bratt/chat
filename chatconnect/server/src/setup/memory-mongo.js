import { MongoMemoryServer } from 'mongodb-memory-server';

let started = false;

export async function initMemoryMongoIfNeeded() {
  if (started || process.env.USE_MEM_DB !== 'true') return;
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  started = true;
  console.log('[memdb] MongoMemoryServer started at', uri);
}