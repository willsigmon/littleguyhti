# Requested Knack integration diagnosis or deployment — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy HTI Dashboard

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Validate Knack connection
        run: npm run test:knack-api
        env:
          KNACK_APP_ID: ${{ secrets.KNACK_APP_ID }}
          KNACK_API_KEY: ${{ secrets.KNACK_API_KEY }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Notify deployment
        run: |
          curl -X POST https://hooks.slack.com/services/${{ secrets.SLACK_WEBHOOK }} \
          -d '{"text": "✅ HTI Dashboard deployed to production"}'
```

### Pre-Deployment Checks
```javascript
async function pre_deployment_checks() {
  const checks = {
    knack_api: await test_knack_connection(),
    data_integrity: await validate_production_data(),
    cache_warm: await warm_cache(),
    env_vars: await verify_env_vars(),
    build_size: await check_bundle_size()
  };

  const all_passed = Object.values(checks).every(c => c.passed);

  if (!all_passed) {
    throw new Error(`Pre-deployment checks failed: ${JSON.stringify(checks)}`);
  }

  return checks;
}

// Run before every production deploy
async function test_knack_connection() {
  try {
    const response = await get_records("object_1", { rows_per_page: 1 });
    return { passed: true, message: "Knack API accessible" };
  } catch (error) {
    return { passed: false, message: `Knack API error: ${error.message}` };
  }
}
```

## Monitoring & Alerting

### Uptime Monitoring
```javascript
// Use Vercel Analytics or external service (Pingdom, UptimeRobot)
async function setup_uptime_monitoring() {
  // Vercel Analytics (automatic)
  // https://vercel.com/docs/analytics

  // Or external monitoring
  const monitor = await createUptimeCheck({
    url: "https://hubdash.vercel.app",
    interval: 300, // 5 minutes
    alert_contacts: ["admin@hubzonetech.org"]
  });

  return monitor;
}
```

### Error Tracking
```javascript
// Sentry integration
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,

  beforeSend(event) {
    // Don't send test data errors
    if (event.request?.url?.includes('localhost')) {
      return null;
    }
    return event;
  }
});

// Log Knack API errors
try {
  await get_records("object_1");
} catch (error) {
  Sentry.captureException(error, {
    tags: { service: "knack_api" },
    extra: { object_key: "object_1" }
  });
}
```

### Performance Monitoring
```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function send_to_analytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id
  });

  fetch('/api/analytics', { method: 'POST', body });
}

getCLS(send_to_analytics);
getFID(send_to_analytics);
getFCP(send_to_analytics);
getLCP(send_to_analytics);
getTTFB(send_to_analytics);
```

## Environment Management

### Development Environment
```bash
# .env.development
KNACK_APP_ID=dev_app_id
KNACK_API_KEY=dev_api_key
VERCEL_ENV=development
CACHE_TTL=30 # Shorter cache for testing
DEBUG_MODE=true
```

### Production Environment
```bash
# .env.production (in Vercel dashboard)
KNACK_APP_ID=prod_app_id
KNACK_API_KEY=prod_api_key
VERCEL_ENV=production
CACHE_TTL=300 # 5 minutes
DEBUG_MODE=false
SENTRY_DSN=https://...
```

### Secrets Management
```javascript
// Store secrets in Vercel Environment Variables
// Never commit secrets to Git

// Access in code:
const knack_api_key = process.env.KNACK_API_KEY;

// Rotate secrets quarterly (align with grant reporting)
async function rotate_secrets() {
  // 1. Generate new API key in Knack dashboard
  // 2. Update Vercel environment variables
  // 3. Trigger redeployment
  // 4. Verify new keys work
  // 5. Revoke old keys
}
```

## Performance Optimization

### Bundle Size Analysis
```javascript
// Run during CI/CD
import { readFileSync } from 'fs';

async function check_bundle_size() {
  const bundle_stats = JSON.parse(readFileSync('.next/analyze/client.json'));

  const total_size = bundle_stats.reduce((sum, bundle) => sum + bundle.size, 0);
  const max_size = 1_000_000; // 1MB

  if (total_size > max_size) {
    console.warn(`Bundle size ${total_size} exceeds ${max_size}`);
    return { passed: false, size: total_size };
  }

  return { passed: true, size: total_size };
}
```

### Cache Warming
```javascript
// Warm cache after deployment
async function warm_cache() {
  const critical_endpoints = [
    "/api/metrics",
    "/api/county-breakdown",
    "/api/quarterly-report"
  ];

  for (const endpoint of critical_endpoints) {
    await fetch(`https://hubdash.vercel.app${endpoint}`);
  }

  return { warmed: critical_endpoints.length };
}
```
