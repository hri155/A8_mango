# Mango Books — Online Book Borrowing Platform

A seamless and modern web application that digitizes the traditional library experience. Users can explore books, filter by categories, borrow titles digitally, and manage their profile — built with **Next.js**, **BetterAuth**, **MongoDB**, **Tailwind CSS**, and **DaisyUI**.

## Live URL

> Deploy to Vercel and paste your live link here: `https://your-app.vercel.app`

## GitHub Repository

> Paste your GitHub repo link here after pushing.

## Key Features

- **Home Page** — Hero banner, scrolling marquee, featured books (top 4 from API), and two custom sections (Why Mango Books + Browse by Category)
- **All Books** — Search by title + category sidebar filter (Story, Tech, Science)
- **Book Details** — Private route with cover, author, description, availability, and borrow action with toast confirmation
- **Authentication** — Email/password login & registration with BetterAuth
- **Google OAuth** — One-click social login via Google
- **My Profile** — Private route showing all user information
- **Update Profile** — Edit name and profile image using BetterAuth `updateUser`
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Animate.css** — Smooth entrance animations across pages

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework (App Router) |
| Tailwind CSS v4 | Utility-first styling |
| DaisyUI | UI component library |
| BetterAuth | Authentication (email + Google) |
| MongoDB | User session & account storage |
| Animate.css | CSS animations |
| React Hot Toast | Toast notifications |

## NPM Packages Used

- `next`, `react`, `react-dom`
- `better-auth`
- `mongodb`
- `daisyui`
- `animate.css`
- `react-hot-toast`
- `tailwindcss`, `@tailwindcss/postcss`, `typescript`, `eslint`

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mango-books
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | Database name (default: `mango-books`) |
| `BETTER_AUTH_SECRET` | Random secret (min 32 characters) |
| `BETTER_AUTH_URL` | App URL (`http://localhost:3000` for dev) |
| `NEXT_PUBLIC_APP_URL` | Same as above, used by auth client |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

#### MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user and get your connection string
3. Add `0.0.0.0/0` to Network Access (for Vercel deployment)

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. For production, also add: `https://your-app.vercel.app/api/auth/callback/google`

#### Generate Auth Secret

```bash
openssl rand -base64 32
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth API routes
│   ├── api/books/           # Books JSON API
│   ├── all-books/           # All books with search & filter
│   ├── books/[id]/          # Book details (private)
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── profile/             # User profile (private)
│   └── profile/update/      # Update profile (private)
├── components/              # Reusable UI components
├── data/books.json          # 12 book records
├── lib/                     # Auth, MongoDB, book helpers
└── types/                   # TypeScript types
```

## Deployment (Vercel)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel domain
5. Deploy

## Assignment Checklist

- [x] Header with logo, nav links, conditional login/logout
- [x] Footer with social links and Contact Us
- [x] Home: banner, marquee, featured books, 2 extra sections
- [x] Login & Register with email/password + Google OAuth
- [x] All Books with search bar and book cards
- [x] Book Details private route with borrow button + toast
- [x] My Profile private route with user info
- [x] Update profile challenge (name + image)
- [x] Category sidebar filter challenge
- [x] Animate.css npm package integration
- [x] Environment variables for secrets
- [x] Responsive design
- [x] README.md

## Author

**Category A8 — Mango Assignment**
