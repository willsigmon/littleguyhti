---
name: hti-grant-cycle
description: Use when planning, drafting, or executing against HTI's grant reporting cadence — Digital Champion Grant (NCDIT), 8(a) annual filings, HUBZone recertification, federal contract reports, or any recurring HTI compliance deadline. Trigger on "grant report", "NCDIT submission", "quarterly report", "annual filing", "HUBZone recert", "8(a) anniversary", "when is X due", or any HTI deadline-shaped question. Pairs with knack-reporting-sync for the data and grand-slam-offer when pitching new grants.
allowed-tools: Read
---

# HTI Grant Cycle

HTI's recurring compliance cadence. **This is calendar context, not data ops** — the data ops live in the `knack-*` skill family. This skill helps Will know what's coming up and when.

## Major recurring obligations

| Obligation | Cadence | Lead time | Skill |
|-----------|---------|-----------|-------|
| **NCDIT Digital Champion Grant report** | Quarterly | 2-3 weeks | [[knack-reporting-sync]] |
| **HUBZone recertification** | Annual | 6-8 weeks (eligibility + docs) | — |
| **8(a) annual review** | Anniversary | 4 weeks | — |
| **SAM.gov registration renewal** | Annual | 2 weeks | — |
| **Board meeting prep** | Quarterly (typically) | 1-2 weeks | [[knack-dashboard-ai]] |
| **Donor / partner updates** | Monthly to quarterly | varies | [[knack-exporter]] |

## When Will mentions a HTI deadline

1. **Pin the obligation** — which of the above (or a new one)?
2. **Confirm the date** — federal/state deadlines move; verify with NCDIT contact or sam.gov directly
3. **Check the data path:**
   - Quarterly Digital Champion → [[knack-reporting-sync]]
   - Anything Knack-backed → [[knack-reader]] → [[knack-pagination]] → [[knack-exporter]]
   - Goal attainment summary → [[knack-goal-tracker]]
4. **Stage the packet** in the format the agency expects (PDF for NCDIT, JSON for grants.gov, etc.)
5. **Save to Drive** under the HTI Workspace account (`account_label=hti` via [[sigcomms]])

## When Will is pitching a NEW grant

- Switch into [[grand-slam-offer]] mode — but adapted for federal grant language:
  - "Dream Outcome" = grant funder's mission alignment, not retail-customer outcome
  - "Perceived Likelihood" = HTI's past performance record + capacity statement
  - "Time Delay" = project start-to-impact timeline
  - "Effort & Sacrifice" = agency reporting burden, match requirements, indirect cost rate
- "Avatar" = the program officer reading the proposal, not the end beneficiary

## Don't

- **Don't auto-send anything to NCDIT.** Federal contracting context = always confirm before any external send. Per `workspace-accounts.md`, HTI Gmail send is a warn-first scope.
- **Don't share donor PII** outside the explicit recipient. NCDIT submissions go through grants.gov; donor breakdowns go to HTI board only.
- **Don't lift Leavn / WSMCO copy** and paste into HTI proposals. Federal grants have a distinct register; Hormozi punch lines read wrong.

## Reference
- [[hti-expert]] — full HTI knowledge base (mission, brand, programs, technical processes)
- [[knack-reporting-sync]] — the automation that builds report packets
- [[four-verticals-router]] — confirms `account_label=hti` for any Workspace ops
- Routing rules: `~/.claude/rules/workspace-accounts.md`
