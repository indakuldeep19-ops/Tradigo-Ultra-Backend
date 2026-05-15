# Tradigo Ultra — Deployment Guide

## Docker Compose (Recommended)

```bash
# 1. Configure environment
cp .env.example .env
# Set: POSTGRES_PASSWORD, SESSION_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

# 2. Start all services
docker compose up -d

# 3. Push DB schema (first time only)
docker compose exec api pnpm --filter @workspace/db run push

# 4. Seed demo data (optional)
curl -X POST http://localhost/api/demo/seed

# 5. Verify health
curl http://localhost/api/healthz
```

Services started: Postgres → API → Frontend → Nginx (ports 80/443)

---

## Nginx WebSocket Config

Socket.io requires WebSocket upgrade headers:

```nginx
location /api/socket.io/ {
    proxy_pass http://api_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400s;
}
```

See `nginx.conf` for the full production-ready config.

---

## SSL/TLS

```bash
# With Let's Encrypt (Certbot)
sudo certbot --nginx -d yourdomain.com
```

Place certs in `./ssl/fullchain.pem` and `./ssl/privkey.pem` for the Docker setup.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `SESSION_SECRET` | ✅ | JWT signing secret (≥ 32 chars) |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay key secret |
| `PORT` | optional | API port (default: 8080) |
| `NODE_ENV` | optional | `production` enables security hardening |
| `USD_TO_INR` | optional | Conversion rate (default: 83.5) |

---

## VPS / Bare Metal

```bash
# Install Node.js 24 + pnpm
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pnpm

# Clone and install
git clone <repo> /opt/tradigo
cd /opt/tradigo && pnpm install

# Configure
cp .env.example .env && nano .env

# Build
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/tradigo run build
pnpm --filter @workspace/db run push

# Run with PM2
npm install -g pm2
pm2 start artifacts/api-server/dist/index.mjs \
  --name tradigo-api --node-args="--enable-source-maps"
pm2 save && pm2 startup
```

---

## CI/CD (GitHub Actions)

The repo includes two workflows:

- `.github/workflows/ci.yml` — Runs on every push: TypeScript → Tests → Build → Docker
- `.github/workflows/deploy.yml` — Manual deploy via SSH

Required GitHub Secrets: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `POSTGRES_PASSWORD`, `SESSION_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

---

## Production Checklist

- [ ] `SESSION_SECRET` is a strong random string (not the dev default)
- [ ] `RAZORPAY_KEY_ID/SECRET` are **live** keys (not test keys)
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Nginx WebSocket headers set for `/api/socket.io/`
- [ ] DB schema pushed: `pnpm --filter @workspace/db run push`
- [ ] Health check passes: `GET /api/healthz` → `{ "status": "ok" }`
- [ ] Admin user exists (seed or create manually)
- [ ] Socket.io connects (no WebSocket errors in browser console)
- [ ] Razorpay test payment completes end-to-end
