---
name: knack-devops
description: Use when deploying, monitoring, or troubleshooting HTI's Knack-Vercel integration — build pipelines, environment sync, dashboard uptime, data sync reliability, or performance regressions in production dashboards. Trigger on any HTI deploy, env-var sync, Vercel-build failure, or "the dashboard is down" alert.
allowed-tools: Read
---

# Requested Knack integration diagnosis or deployment

## Entry and scope

Confirm current environment and authorized scope. Inspect before mutation, choose the narrowest reversible action, and preserve production data/credentials. Treat CI/CD, disaster recovery and environment examples as templates, not commands to execute automatically. Verify service/data behavior separately from build success.

## Decision and safety gates

- Follow current task instructions, current provider/capability precedence, and repository facts. Do not change the selected model, permissions, credentials, or provider configuration.
- Loading this skill does not authorize generation spending, external sends/sharing, memory ingestion, deployments, production data changes, or destructive cleanup. Use only the authorized stages and preserve unrelated work.
- Keep source-specific identity, privacy, accessibility, reduced-motion, performance, storage and release/acceptance requirements when they apply. Read their matching reference sections before the relevant action.
- Preserve behavior and verify the requested result with artifacts. Report unavailable tools and external/device gates honestly; never substitute a passing compile or a raster concept for product behavior.

## Conditional reference map

Do not load the entire reference set. Select the smallest topic needed for the current step; load input/runtime/acceptance or safety sections before executing that step. Detailed examples retain their original context and are subordinate to these gates.

- [Purpose / Core Functions](references/audit-guide-01.md)
- [CI/CD Pipeline / Monitoring & Alerting / Environment Management / Performance Optimization](references/audit-guide-02.md)
- [Disaster Recovery / Integration Points / Best Practices / Incident Response](references/audit-guide-03.md)

## Completion

Deliver the requested artifact/change and the focused checks performed, with limitations. Keep independent review genuinely independent where the current workflow requires it. Do not extend a narrow task into an unsolicited full engagement.
