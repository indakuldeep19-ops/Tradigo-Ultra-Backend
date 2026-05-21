# Tradigo Ultra — Local Setup Guide

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 (24 recommended) |
| pnpm | ≥ 9 |
| PostgreSQL | ≥ 14 |

Install pnpm: `npm install -g pnpm`

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and secrets

# 3. Push DB schema
pnpm --filter @workspace/db run push

# 4. Start API server (Terminal 1)
pnpm --filter @workspace/api-server run dev

# 5. Start frontend (Terminal 2)
pnpm --filter @workspace/tradigo run dev

# 6. (Optional) Seed demo data
curl -X POST http://localhost:8080/api/demo/seed
```

---

## Demo Credentials

| User | Email | Password | Plan |
|------|-------|----------|------|
| Admin | admin@tradigo.com | admin123 | ULTRA |
| Demo | demo@tradigo.com | admin123 | PRO |

---

## Key Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm run typecheck` | TypeScript check across all packages |
| `pnpm --filter @workspace/db run push` | Push DB schema (dev only) |
| `pnpm --filter @workspace/api-server run dev` | Run API server (port 8080) |
| `pnpm --filter @workspace/tradigo run dev` | Run React frontend |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks from OpenAPI spec |
| `pnpm --filter @workspace/api-server run test` | Run backend integration tests |

---

## Architecture

```
tradigo-ultra/
├── artifacts/
│   ├── api-server/          # Express 5 + Socket.io + Razorpay
│   │   └── src/
│   │       ├── app.ts       # Express + Socket.io setup
│   │       ├── routes/      # All 17 route handlers
│   │       ├── lib/         # Auth, Razorpay, Socket, Logger
│   │       └── middlewares/ # JWT auth middleware
│   └── tradigo/             # React + Vite + Tailwind + shadcn/ui
│       └── src/
│           ├── App.tsx      # Wouter routes
│           ├── pages/       # 15 page components
│           ├── components/  # Layout, UI, Razorpay checkout
│           └── hooks/       # Auth, Currency, Razorpay hooks
├── lib/
│   ├── db/                  # Drizzle ORM schema + client
│   ├── api-spec/            # OpenAPI 3.1 YAML (source of truth)
│   ├── api-client-react/    # Generated React Query hooks
│   └── api-zod/             # Generated Zod validation schemas
├── .github/workflows/       # CI/CD (TypeScript + tests + Docker)
├── Dockerfile.api           # Multi-stage API server image
├── Dockerfile.frontend      # Vite build + Nginx SPA image
├── docker-compose.yml       # Full production stack
└── .env.example
```

---

## Key Architecture Notes

**Auth:** JWT stored in `localStorage` key `tradigo_token`. Bearer token on all API calls. 7-day expiry.

**Socket.io:** Path `/api/socket.io`. Broadcasts BTC/ETH/SOL/BNB prices every 3s. Room events: `room-trade`, `room-message`, `room-member-joined`, `room-member-kicked`.

**Razorpay:** create-order → frontend popup → verify-payment (HMAC-SHA256). Amounts in paise (USD × 83.5 × 100).

**walletBalance:** Stored as NUMERIC in DB → returned as string from Drizzle. Always `parseFloat()` before arithmetic.

**Fraud detection:** Trades > $500,000 auto-flagged → `fraud_logs` table. Trade still executes.

**Multi-currency:** 20 display currencies, `useCurrency()` hook, `fmt(value)` everywhere. Exchange rates cached hourly.

---

## Troubleshooting

- **Socket.io not connecting** — Ensure path includes BASE_PATH prefix in frontend `socket.ts`
- **Razorpay popup not opening** — Check `RAZORPAY_KEY_ID` is set; Razorpay script must load
- **Zod v4 error** — Frontend forms use plain `zod`, not `zod/v4` (`@hookform/resolvers` v3 incompatibility)
- **Backend changes not reflected** — After route changes: `pnpm --filter @workspace/api-server run build` then restart
- **CoinGecko rate limits** — 60s server-side cache + fallback data prevents most issues
