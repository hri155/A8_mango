# Mango Books

This is an online book borrowing website. Users can browse books, search by title, filter by category, login, register, borrow books, and update their profile.

Assignment: Category A8 Mango

Author: Hridi (hridibaishya@gmail.com)

Live URL: https://a8-mango-fogd5jg28-hridi-s-projects.vercel.app/

Also available at: https://mango-books-virid.vercel.app/

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

For local:
BETTER_AUTH_URL = http://localhost:3000
NEXT_PUBLIC_APP_URL = http://localhost:3000

For live site (https://mango-books-virid.vercel.app) set in Vercel:
BETTER_AUTH_URL = https://mango-books-virid.vercel.app
NEXT_PUBLIC_APP_URL = https://mango-books-virid.vercel.app

See .env.production.example for full production values.

GOOGLE_CLIENT_ID = from google cloud console
GOOGLE_CLIENT_SECRET = from google cloud console


Demo account for testing:

Email: test+1234@gmail.com
Password: 12345678

To create demo account locally run:
npm run seed:demo

For live site run:
NEXT_PUBLIC_APP_URL=https://a8-mango-fogd5jg28-hridi-s-projects.vercel.app npm run seed:demo


How to deploy on Vercel:

This is a Next.js app (not Express). You do NOT need vercel.json or index.js.

1. Push code to github
2. Import project on vercel.com
3. Add environment variables in Vercel dashboard (Settings → Environment Variables)
   - Names are case sensitive — must match exactly:
   - MONGODB_URI
   - MONGODB_DB_NAME
   - BETTER_AUTH_SECRET
   - BETTER_AUTH_URL
   - NEXT_PUBLIC_APP_URL
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
4. Use your stable domain link from Vercel dashboard (Domains section):
   https://mango-books-virid.vercel.app
   (Terminal deploy link may change — dashboard domain stays same)
5. Redeploy after changing env variables

MongoDB Atlas checklist:

1. Network Access → allow 0.0.0.0/0 (all IPs) so Vercel can connect
2. Database Access → correct username and password in MONGODB_URI
3. After changing password click Update User in Atlas
4. Copy connection string from Connect → Drivers

Vercel env values for live site:

MONGODB_URI = mongodb+srv://USER:PASSWORD@cluster0.uzw2cal.mongodb.net/mango-books?retryWrites=true&w=majority
MONGODB_DB_NAME = mango-books
BETTER_AUTH_SECRET = any random string min 32 characters
BETTER_AUTH_URL = https://mango-books-virid.vercel.app
NEXT_PUBLIC_APP_URL = https://mango-books-virid.vercel.app

package.json already has: "start": "next start" (required for Vercel)


NPM packages used:

next, react, react-dom, better-auth, mongodb, daisyui, animate.css, react-hot-toast, tailwindcss, typescript, eslint
