import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { nextCookies } from "better-auth/next-js";
import { MongoClient, ServerApiVersion } from "mongodb";

const mongoUri = process.env.MONGODB_URI?.trim();
const hasRealMongoUri = Boolean(
  mongoUri &&
    !mongoUri.includes("<") &&
    !mongoUri.includes("your-") &&
    !mongoUri.includes("mongodb+srv://<")
);

const database = hasRealMongoUri
  ? (() => {
      const client = new MongoClient(mongoUri!, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      const db = client.db(process.env.MONGODB_DB_NAME || "mango-books");

      return mongodbAdapter(db, {
        client,
        transaction: false,
      });
    })()
  : memoryAdapter({
      user: [],
      session: [],
      account: [],
      verification: [],
    });

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database,
  advanced: {
    disableCSRFCheck: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://mango-books-virid.vercel.app",
    "https://a8-mango-fogd5jg28-hridi-s-projects.vercel.app",
    "https://*.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],
  plugins: [nextCookies()],
});

void (async () => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: "Demo User",
        email: "test+1234@gmail.com",
        password: "12345678",
      },
      headers: new Headers({
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        host: "localhost:3000",
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!message.toLowerCase().includes("already") && !message.toLowerCase().includes("exist")) {
      console.warn("Demo account seed skipped:", message);
    }
  }
})();
