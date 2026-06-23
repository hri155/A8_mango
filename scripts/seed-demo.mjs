/**
 * Seeds the demo user for local development and assignment testing.
 * Run: npm run seed:demo
 */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const DEMO_USER = {
  name: "Demo User",
  email: "test+1234@gmail.com",
  password: "12345678",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&h=200&fit=crop",
};

async function seedDemoUser() {
  console.log("Creating demo account...");
  console.log(`  Email:    ${DEMO_USER.email}`);
  console.log(`  Password: ${DEMO_USER.password}`);

  const signUpResponse = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: BASE_URL,
    },
    body: JSON.stringify(DEMO_USER),
  });

  const signUpBody = await signUpResponse.text();

  if (signUpResponse.ok) {
    console.log("\nDemo account created successfully.");
  } else if (
    signUpBody.toLowerCase().includes("already") ||
    signUpResponse.status === 422
  ) {
    console.log("\nDemo account already exists — skipping creation.");
  } else {
    console.error("\nFailed to create demo account:");
    console.error(`  Status: ${signUpResponse.status}`);
    console.error(`  Body: ${signUpBody}`);
    process.exit(1);
  }

  const loginResponse = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: BASE_URL,
    },
    body: JSON.stringify({
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    }),
  });

  if (!loginResponse.ok) {
    console.error("\nLogin test failed:");
    console.error(`  Status: ${loginResponse.status}`);
    console.error(`  Body: ${await loginResponse.text()}`);
    process.exit(1);
  }

  console.log("Login test passed.");
  console.log("\nUse these credentials at /login:");
  console.log(`  Email:    ${DEMO_USER.email}`);
  console.log(`  Password: ${DEMO_USER.password}`);
}

seedDemoUser().catch((error) => {
  console.error(error);
  process.exit(1);
});
