# Requested Knack integration diagnosis or deployment — selected reference

Read only when the entrypoint selects this topic. These are specialized reference details, not independent provider, spending, publishing, production, or memory-write authority. Current task scope, project brand and the entrypoint gates control any imperative recipe below. Examples are not standing authorization. All code/script paths are relative to the skill root unless a link specifies otherwise.

## Disaster Recovery

### Database Recovery
```javascript
async function restore_from_backup({ backup_date, objects }) {
  const s3 = new AWS.S3();

  for (const object_key of objects) {
    // Fetch backup
    const backup = await s3.getObject({
      Bucket: 'hti-backups',
      Key: `knack/${object_key}_${backup_date}.json`
    }).promise();

    const records = JSON.parse(backup.Body.toString());

    // Restore to Knack (batch insert)
    console.log(`Restoring ${records.length} records to ${object_key}`);
    // Implementation depends on Knack's batch API
  }
}
```

### Rollback Procedure
```javascript
// Rollback to previous Vercel deployment
async function rollback_deployment() {
  const vercel = new Vercel({ bearerToken: process.env.VERCEL_TOKEN });

  // Get previous deployment
  const deployments = await vercel.deployments.list({
    projectId: process.env.VERCEL_PROJECT_ID,
    limit: 2
  });

  const previous = deployments[1];

  // Promote to production
  await vercel.deployments.update(previous.id, {
    target: 'production'
  });

  console.log(`Rolled back to ${previous.id}`);
}
```

## Integration Points

- **knack_reader**: Monitor API health
- **knack_cache_optimizer**: Cache invalidation on deploy
- **knack_realtime**: Webhook endpoint health checks
- **knack_reporting_sync**: Automated report generation triggers
- **knack_dashboard_ai**: Performance metrics collection

## Best Practices

1. **Automate everything**: No manual deployments
2. **Test before deploy**: CI/CD checks gate production
3. **Monitor continuously**: Uptime + performance + errors
4. **Backup daily**: 90-day retention
5. **Document runbooks**: Incident response procedures
6. **Rotate secrets quarterly**: Align with grant reporting cycle

## Incident Response

### Runbook: Dashboard Down
1. Check Vercel status page
2. Verify Knack API connectivity
3. Review recent deployments
4. Check error logs in Sentry
5. If needed, rollback deployment
6. Notify stakeholders
7. Post-incident review

### Runbook: Slow Dashboard
1. Check API latency metrics
2. Review cache hit rates
3. Analyze bundle size
4. Check Knack rate limits
5. Optimize queries if needed
6. Consider CDN configuration
