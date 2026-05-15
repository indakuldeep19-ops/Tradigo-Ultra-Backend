# Tradigo Ultra

A production-ready crypto paper trading platform. Users start with $10,000 virtual balance and can buy/sell real cryptocurrencies using live CoinGecko prices, view AI-generated trading signals, track their portfolio P&L, and get real-time price updates via Socket.io.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/tradigo run dev` — run the React frontend (port 21870)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — JWT signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui + wouter routing
- Backend: Express 5 + Socket.io for real-time prices
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT (Bearer tokens, stored in localStorage)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Market data: CoinGecko API (with 60s cache and fallback data)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all routes)
- `lib/api-zod/src/generated/api/api.ts` — Generated Zod schemas
- `lib/api-client-react/src/generated/api.ts` — Generated React Query hooks
- `lib/db/src/schema.ts` — Database schema (users, trades, subscriptions, fraud_logs)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/app.ts` — Express app + Socket.io setup
- `artifacts/tradigo/src/pages/` — React page components
- `artifacts/tradigo/src/components/layout.tsx` — Sidebar layout
- `artifacts/tradigo/src/hooks/use-auth.tsx` — Auth context + JWT management

## Architecture decisions

- JWT auth stored in localStorage; `setAuthTokenGetter` wires it into every API call via custom-fetch
- Socket.io broadcasts real-time BTC/ETH/SOL/BNB price ticks every 3 seconds to all connected clients
- Fraud detection: any trade with total > $500,000 auto-flags and logs to `fraud_logs` table
- CoinGecko responses are cached for 60s server-side to avoid rate limits; fallback data returned on error
- AI signals are algorithmically generated from 24h price change direction with confidence scores

## Product

- **Authentication**: Register/login with JWT, $10,000 starting balance; referral code auto-generated on register
- **Dashboard**: Live wallet balance, recent trades, live price ticker, holdings summary
- **Market**: Full CoinGecko price list with 24h change, trending coins, live Socket.io prices
- **Trade**: Buy/sell any of 10 major coins; live price preview; wallet balance check
- **Portfolio**: Holdings breakdown, average buy price, total invested/returned, full trade history
- **AI Signals**: BUY/SELL/HOLD signals for 7 major coins with confidence, entry/target/stoploss
- **Admin Panel**: Platform stats, all users/trades, fraud log, revenue dashboard, withdrawal approvals (ADMIN only)
- **Profile**: Edit name, view plan/wallet/join date
- **Pricing**: Subscription plans (Free/$0, Pro/$9.99, Premium/$24.99, VIP/$99.99) with Razorpay/Stripe/PayPal/UPI payment modal
- **Wallet**: Platform balance, deposit (any gateway), withdraw (pending approval), full transaction history
- **Referrals**: Share referral code/link, L1=$50 reward, L2=$10 reward (multi-level), apply friend's code
- **Affiliates**: 6 exchange cards (Binance, Bybit, CoinDCX, WazirX, OKX, KuCoin) with affiliate links

## Monetization System

- **Subscription plans**: FREE/PRO/PREMIUM/VIP/ULTRA stored in `plan` enum; upgrade via `/subscriptions/upgrade`
- **Platform balance**: Separate from trading balance; stored in `platform_balance` column; earned via referrals/commissions
- **Wallet transactions**: All deposits, withdrawals, subscription payments, referral rewards tracked in `wallet_transactions`
- **Referral system**: Multi-level (L1=$50, L2=$10); referral code per user; applied at registration or via `/referrals/apply`
- **Commission tracking**: All revenue recorded in `commissions` table with source type and rate
- **Ad banners**: Managed via `/admin/ads` endpoints; positions: DASHBOARD_TOP/BOTTOM/SIDEBAR/MARKET_TOP/SIGNALS_TOP
- **Revenue dashboard**: `/admin/revenue` returns breakdowns by source, gateway, plan distribution, pending withdrawals

## Demo Credentials

- Admin: `admin@tradigo.com` / `admin123` (ULTRA plan, $50,000 balance)
- Demo user: `demo@tradigo.com` / `admin123` (PRO plan, $8,750 balance, seeded trades)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After changing backend routes, always rebuild: `pnpm --filter @workspace/api-server run build` then restart workflow
- The `use-auth` hook must be `.tsx` (not `.ts`) because it renders JSX
- Socket.io path must include the app BASE_PATH prefix
- CoinGecko free tier has rate limits; 60s cache prevents most issues
- `walletBalance` is stored as NUMERIC in DB and returned as string from Drizzle — always `parseFloat()` before arithmetic

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
