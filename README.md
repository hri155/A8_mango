# Mango Books

This is an online book borrowing website. Users can browse books, search by title, filter by category, login, register, borrow books, and update their profile.

Assignment: Category A8 Mango

Author: Hridi (hridibaishya@gmail.com)

Live URL: (add your vercel link here)

GitHub Repo: https://github.com/hri155/A8_mango


What this project has:

- Home page with banner, marquee, and featured books
- All books page with search and category filter
- Book details page (login required)
- Login and register pages
- Google login support
- My profile page (login required)
- Update profile page
- Responsive design for mobile, tablet, and desktop


Tech used:

- Next.js
- Tailwind CSS
- DaisyUI
- BetterAuth
- MongoDB
- Animate.css
- React Hot Toast


How to run the project:

1. Clone the project
2. Go inside the mango-books folder
3. Run: npm install
4. Copy .env.example to .env.local and fill the values
5. Run: npm run dev
6. Open http://localhost:3000 in browser


Environment variables needed in .env.local:

MONGODB_URI = your mongodb connection string
MONGODB_DB_NAME = mango-books
BETTER_AUTH_SECRET = any random secret (at least 32 characters)
BETTER_AUTH_URL = http://localhost:3000
NEXT_PUBLIC_APP_URL = http://localhost:3000
GOOGLE_CLIENT_ID = from google cloud console
GOOGLE_CLIENT_SECRET = from google cloud console


Demo account for testing:

Run this command first:
npm run seed:demo

Then login with:
Email: demo@mangobooks.com
Password: Demo@12345


How to deploy:

1. Push code to github
2. Deploy on vercel.com
3. Add all env variables in vercel settings
4. Update BETTER_AUTH_URL and NEXT_PUBLIC_APP_URL to your live site url


NPM packages used:

next, react, react-dom, better-auth, mongodb, daisyui, animate.css, react-hot-toast, tailwindcss, typescript, eslint
