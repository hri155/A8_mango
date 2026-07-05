import { auth } from "./auth";

export async function ensureDemoUser() {
  const demoEmail = "test+1234@gmail.com";
  const demoPassword = "12345678";

  try {
    await auth.api.signUpEmail({
      body: {
        name: "Demo User",
        email: demoEmail,
        password: demoPassword,
      },
      headers: new Headers({
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        host: "localhost:3000",
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!message.toLowerCase().includes("already") && !message.toLowerCase().includes("exist")) {
      console.error("Failed to seed demo user:", error);
    }
  }
}
