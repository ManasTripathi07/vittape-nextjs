# VittaPe — Next.js Investment & Trading Analytics

> Power BI–style dashboards for IPO analytics, investment tracking, and trading — built with Next.js 14, MongoDB, Recharts, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Features

| Page | Description |
|------|-------------|
| **Dashboard** | Power BI–style overview — 4 stat tiles, IPO trends (area chart), sector breakdown (bar chart), investment-by-round (donut), trade activity (bar), top investors, recent deals, recent trades. Auto-refreshes every 30s. |
| **Investments** | Filterable investment tracker — round filter pills, paginated table with company, sector, amount, valuation, lead investor, equity %, date. |
| **Trading** | Live trading desk — type summary strip (BUY/SELL/SHORT/COVER), full trade log table with ticker, price, quantity, status, exchange. Auto-refreshes every 15s. |

### Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Recharts, Lucide icons, Framer Motion
- **Backend:** Next.js API Routes, Mongoose ODM
- **Database:** MongoDB (5 collections — Company, IPO, Investment, Investor, Trade)
- **Design:** Dark glass-morphism, DM Sans + JetBrains Mono, responsive mobile-first

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_ORG/vittape-nextjs.git
cd vittape-nextjs
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/vittape
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Seed Database

```bash
npm run seed
```

Seeds 20 companies, 5 investors, IPOs, ~50 investments, and 40 trades.

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/dashboard`.

---

## Project Structure

```
vittape-nextjs/
├── src/
│   ├── app/
│   │   ├── api/                  # Next.js API routes
│   │   │   ├── health/           # GET /api/health
│   │   │   ├── companies/        # GET /api/companies?sector=&stage=&page=
│   │   │   ├── ipos/             # GET /api/ipos?status=&page=
│   │   │   ├── investments/      # GET & POST /api/investments
│   │   │   └── metrics/          # GET /api/metrics (dashboard aggregate)
│   │   ├── dashboard/            # Main Power BI dashboard
│   │   ├── investments/          # Investment tracker page
│   │   ├── trading/              # Trading desk page
│   │   ├── layout.js             # Root layout
│   │   └── page.js               # Redirects to /dashboard
│   ├── components/
│   │   ├── charts/               # Recharts: IPOTrend, Sector, Round, Trade
│   │   ├── layout/               # Sidebar navigation
│   │   └── ui/                   # StatCard, Skeleton, TopInvestors, RecentDeals, RecentTrades
│   ├── lib/
│   │   ├── models/               # Mongoose: Company, IPO, Investment, Investor, Trade
│   │   ├── mongodb.js            # Cached DB connection
│   │   ├── format.js             # ₹ currency, dates, badge colors
│   │   └── seed.mjs              # Database seeder
│   └── styles/
│       └── globals.css           # Tailwind + glass-morphism utilities
├── .env.example
├── jsconfig.json
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Server + DB health check |
| GET | `/api/metrics` | Full dashboard aggregate (cards, charts, tables) |
| GET | `/api/companies` | Paginated, filter by `sector` / `stage` |
| GET | `/api/ipos` | Paginated, filter by `status` |
| GET | `/api/investments` | Paginated, filter by `round` |
| POST | `/api/investments` | Create new investment record |

---

## Deployment (Vercel + MongoDB Atlas)

### MongoDB Atlas

1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Add database user, whitelist `0.0.0.0/0`
3. Copy connection string

### Vercel

```bash
npm i -g vercel
vercel login
vercel
```

Set environment variable in Vercel dashboard:
- `MONGODB_URI` → your Atlas connection string

Or via CLI:
```bash
vercel env add MONGODB_URI
```

After deploy, seed your production DB:
```bash
MONGODB_URI="your-atlas-uri" npm run seed
```

---

## Related Repos

| Repo | Description |
|------|-------------|
| **vittape-webapp** | MERN monorepo (Express API + Vite React dashboard) |
| **vidya-coddle-tech-api** | Open-source Express + MongoDB starter (VCT) |

---

## License

MIT © VCT (Vidya Coddle Tech)
