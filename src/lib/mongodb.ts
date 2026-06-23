import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

// Atlas Stable API — same options as MongoDB driver snippet
// Vercel/serverless: do NOT call connect(), close(), or ping here
const client =
  global._mongoClient ??
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

global._mongoClient = client;

export default client;
