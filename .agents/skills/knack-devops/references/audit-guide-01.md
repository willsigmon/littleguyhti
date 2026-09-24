# Requested Knack integration diagnosis or deployment — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

# Knack DevOps

## Purpose
Manages automated build, deployment, environment sync, and monitoring for HTI's Knack-Vercel integration. Ensures dashboard uptime, data sync reliability, and performance optimization.

## Core Functions

### trigger_vercel_build
**Purpose**: Programmatically deploy updated dashboard code

**Parameters**:
- `vercel_url` (string, optional): Deployment URL (default: production)
- `trigger` (string, optional): "push" | "webhook" | "api" (default: "api")

**Example**:
```javascript
const deployment = await trigger_vercel_build({
  vercel_url: process.env.VERCEL_PROJECT_URL,
  trigger: "api"
});

// Output:
// {
//   deployment_id: "dpl_abc123",
//   status: "building",
//   url: "https://hubdash-git-main.vercel.app",
//   estimated_completion: "2025-04-15T14:35:00Z"
// }
```

**Implementation**:
```javascript
import { Vercel } from '@vercel/sdk';

async function trigger_vercel_build({ vercel_url }) {
  const vercel = new Vercel({ bearerToken: process.env.VERCEL_TOKEN });

  const deployment = await vercel.deployments.create({
    name: 'hubdash',
    gitSource: {
      type: 'github',
      ref: 'main'
    }
  });

  return {
    deployment_id: deployment.id,
    status: deployment.status,
    url: deployment.url
  };
}
```

### monitor_latency
**Purpose**: Track API and dashboard response times

**Parameters**:
- `api_url` (string, required): Endpoint to monitor
- `interval_seconds` (integer, optional): Check frequency (default: 300 = 5 min)
- `alert_threshold_ms` (integer, optional): Latency threshold for alerts (default: 2000)

**Example**:
```javascript
const monitor = await monitor_latency({
  api_url: "https://hubdash.vercel.app/api/metrics",
  interval_seconds: 300,
  alert_threshold_ms: 2000
});
```

**Implementation**:
```javascript
import axios from 'axios';

async function monitor_latency({ api_url, interval_seconds, alert_threshold_ms }) {
  setInterval(async () => {
    const start = Date.now();

    try {
      await axios.get(api_url);
      const latency = Date.now() - start;

      console.log(`Latency: ${latency}ms`);

      if (latency > alert_threshold_ms) {
        await alert_team({
          severity: "warning",
          message: `Dashboard latency high: ${latency}ms (threshold: ${alert_threshold_ms}ms)`
        });
      }

      // Log to metrics system
      await log_metric({
        metric: "api_latency",
        value: latency,
        timestamp: new Date()
      });
    } catch (error) {
      await alert_team({
        severity: "critical",
        message: `Dashboard unreachable: ${api_url}`,
        error: error.message
      });
    }
  }, interval_seconds * 1000);
}
```

### sync_environment
**Purpose**: Keep Knack credentials and config in sync across environments

**Environments**:
- **Development**: Local testing with sandbox Knack instance
- **Staging**: Pre-production testing with production data copy
- **Production**: Live HTI dashboard with real grant data

**Example**:
```javascript
await sync_environment({
  source: "production",
  target: "staging",
  include: ["knack_credentials", "api_endpoints"],
  exclude: ["user_tokens", "sensitive_keys"]
});
```

**Implementation**:
```javascript
async function sync_environment({ source, target, include, exclude }) {
  // Fetch config from source
  const source_config = await get_env_config(source);

  // Filter based on include/exclude
  const filtered_config = Object.keys(source_config)
    .filter(key => include.includes(key) && !exclude.includes(key))
    .reduce((obj, key) => {
      obj[key] = source_config[key];
      return obj;
    }, {});

  // Apply to target environment
  await update_env_config(target, filtered_config);

  return {
    synced_keys: Object.keys(filtered_config),
    source: source,
    target: target
  };
}
```

### automated_backup
**Purpose**: Regular backups of Knack data for disaster recovery

**Example**:
```javascript
// Daily backup of all Knack objects
cron.schedule('0 2 * * *', async () => {
  const backup = await automated_backup({
    objects: ["object_1", "object_2", "object_training"],
    destination: "s3://hti-backups/knack",
    retention_days: 90
  });

  console.log(`Backup complete: ${backup.records_backed_up} records`);
});
```

**Implementation**:
```javascript
import AWS from 'aws-sdk';

async function automated_backup({ objects, destination, retention_days }) {
  const s3 = new AWS.S3();
  const timestamp = new Date().toISOString().split('T')[0];
  let total_records = 0;

  for (const object_key of objects) {
    // Fetch all records
    const records = await fetch_all_pages(object_key);
    total_records += records.length;

    // Save to S3
    await s3.putObject({
      Bucket: 'hti-backups',
      Key: `knack/${object_key}_${timestamp}.json`,
      Body: JSON.stringify(records, null, 2),
      ContentType: 'application/json'
    }).promise();
  }

  // Clean up old backups (>90 days)
  await cleanup_old_backups({ bucket: 'hti-backups', retention_days });

  return { records_backed_up: total_records, timestamp };
}
```
