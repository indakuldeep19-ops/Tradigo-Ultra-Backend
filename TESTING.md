# Tradigo Ultra — Testing Guide

## Test Suite Overview

| Layer | Framework | Location |
|-------|-----------|----------|
| Backend API (integration) | Node.js `node:test` | `artifacts/api-server/src/__tests__/api.test.ts` |
| Frontend E2E | Playwright | `.github/workflows/ci.yml` (separate job) |

---

## Running Backend Tests

### Prerequisites
A running PostgreSQL database is required.

```bash
# Set environment variables
export DATABASE_URL=postgresql://tradigo:devpassword@localhost:5432/tradigo_test
export SESSION_SECRET=test_secret_for_ci_only_at_least_32_chars
export RAZORPAY_KEY_ID=rzp_test_dummy
export RAZORPAY_KEY_SECRET=dummy_secret
export PORT=8080

# Create test database
createdb tradigo_test

# Push schema to test database
pnpm --filter @workspace/db run push

# Build and run tests
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run test
```

### What the tests cover

1. **Health** — `GET /healthz` returns `{ status: "ok" }`
2. **Auth** — register, login, JWT validation, duplicate email rejection, wrong password, admin role
3. **Market** — price list, trending coins
4. **Signals** — AI signals with valid BUY/SELL/HOLD values and 0-100 confidence
5. **Trades** — buy (deducts balance), sell (adds balance), insufficient balance rejection, trade history
6. **Portfolio** — holdings, P&L, wallet balance
7. **Wallet** — platform balance, transaction history
8. **Referrals** — referral code generation, self-referral rejection
9. **Rooms** — create room, get details, leaderboard, delete
10. **Admin** — stats, user list, revenue breakdown, non-admin rejection
11. **Watchlist** — add coin, duplicate rejection, list, delete
12. **Affiliates** — exchange list with valid URLs
13. **Security** — rate limiting headers on auth routes

---

## Running E2E Tests (Playwright)

### Prerequisites
Both API server and frontend must be running.

```bash
# Install Playwright
npx playwright install --with-deps chromium

# Run E2E tests
npx playwright test
```

### Key user flows tested

1. **Registration flow** — user signs up, gets $10,000 balance
2. **Login flow** — user logs in, redirected to dashboard
3. **Trade flow** — user buys BTC, balance decreases, trade appears in history
4. **Portfolio view** — holdings displayed correctly
5. **Room creation** — user creates trading room, gets invite code
6. **Admin panel** — admin can view stats and users

---

## Test Report Format

Backend tests output to stdout using Node.js TAP format:

```
TAP version 13
# Subtest: Health
ok 1 - GET /healthz returns ok
# Subtest: Auth
ok 2 - POST /auth/register — creates a new user
ok 3 - POST /auth/register — rejects duplicate email
...
1..31
# tests 31
# pass 31
# fail 0
```

---

## CI Integration

Tests run automatically on every push via GitHub Actions (`.github/workflows/ci.yml`):

1. **TypeScript check** — `pnpm run typecheck` across all packages
2. **Backend tests** — runs against a fresh Postgres service container
3. **Frontend build** — `vite build` to catch any build errors
4. **Docker build** — builds API and frontend Docker images (main branch only)

See `.github/workflows/ci.yml` for full configuration.
