import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection on the global object so that concurrent serverless
// invocations (and hot reloads in dev) reuse a single connection instead of
// opening a new one per request.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export const connecctedToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!MONGODB_URL) throw new Error('MONGODB_URL environment variable is not set');

  // Reuse an already-established connection.
  if (cached!.conn) return cached!.conn;

  // Reuse an in-flight connection attempt rather than starting another one.
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URL, {
      dbName: 'Threads',
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    // Reset so the next call can retry instead of awaiting a rejected promise.
    cached!.promise = null;
    throw error;
  }

  return cached!.conn;
};
