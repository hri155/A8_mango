import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

// Vercel/serverless: reuse one client — do NOT call connect(), close(), or ping at startup
const client = global._mongoClient ?? new MongoClient(uri);

global._mongoClient = client;

export default client;
