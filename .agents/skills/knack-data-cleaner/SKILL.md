---
name: knack-data-cleaner
description: Use when cleaning, validating, deduplicating, or normalizing HTI Knack data before NCDIT compliance reports or dashboard rendering. Catches integrity issues, duplicate participants, malformed addresses, and unit inconsistencies that break grant reporting accuracy. Trigger on any data-quality, dedup, or pre-report scrub task on HTI records.
allowed-tools: Read, Edit
---

# Authorized Knack data-quality analysis or cleanup

## Entry and scope

Read current HTI data/schema/access policies. Inspect and dry-run validation/deduplication first; report exact candidate records and backups. Persistent corrections require explicit scope and current identity/permissions. Never infer permission to change production records from a cleanup example. Reconcile counts and integrity after any authorized write.

## Decision and safety gates

- Follow current task instructions, current provider/capability precedence, and repository facts. Do not change the selected model, permissions, credentials, or provider configuration.
- Loading this skill does not authorize generation spending, external sends/sharing, memory ingestion, deployments, production data changes, or destructive cleanup. Use only the authorized stages and preserve unrelated work.
- Keep source-specific identity, privacy, accessibility, reduced-motion, performance, storage and release/acceptance requirements when they apply. Read their matching reference sections before the relevant action.
- Preserve behavior and verify the requested result with artifacts. Report unavailable tools and external/device gates honestly; never substitute a passing compile or a raster concept for product behavior.

## Conditional reference map

Do not load the entire reference set. Select the smallest topic needed for the current step; load input/runtime/acceptance or safety sections before executing that step. Detailed examples retain their original context and are subordinate to these gates.

- [Purpose](references/audit-guide-01.md)
- [Core Functions](references/audit-guide-02.md)
- [HTI-Specific Cleaning Workflows / Data Quality Monitoring / Integration Points / Best Practices / additional related sections](references/audit-guide-03.md)

## Completion

Deliver the requested artifact/change and the focused checks performed, with limitations. Keep independent review genuinely independent where the current workflow requires it. Do not extend a narrow task into an unsolicited full engagement.
