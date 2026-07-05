import { auth } from '../src/lib/auth.ts';

const demoUser = {
  name: 'Demo User',
  email: 'test+1234@gmail.com',
  password: '12345678',
};

try {
  const result = await auth.api.signUpEmail({
    body: demoUser,
    headers: new Headers({
      origin: 'http://localhost:3000',
      host: 'localhost:3000',
    }),
  });

  console.log('Seed result:', result);
} catch (error) {
  console.error('Seed failed:', error);
  process.exit(1);
}
