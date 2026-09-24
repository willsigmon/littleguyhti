---
name: hti-knack-quickref
description: Use as a quick reference for HTI's Knack data shape — which Objects map to which programs (laptop inventory, participants, donors, events), which Views power which dashboards, common filter fields, and the 1,000-record-per-page constraint. Trigger on any "what's the Knack schema for X", "which Object holds Y data", "Knack View for the dashboard", "field name for the participant phone", or pre-query reconnaissance before reading. Pairs with knack-reader, knack-pagination, knack-filter-sort.
allowed-tools: Read
---

# HTI Knack Quick Reference

A reconnaissance skill — **before** firing a [[knack-reader]] query, use this to know which Object, View, or field you actually want.

## Knack basics for HTI

- **Account ID** + **API Key**: in env / 1P, fetched by [[knack-auth]]
- **Page size cap:** 1,000 records — anything bigger needs [[knack-pagination]]
- **Rate limit:** 10 requests/sec — respect via [[knack-cache-optimizer]]
- **Two auth modes:** API Key (full read/write, server-side) vs User Token (scoped, dashboard-side) — see [[knack-auth]]

## Discovering the schema

Knack doesn't expose `.schema`-style introspection from the public API, but you can:

```bash
# Fetch metadata for a specific Object (use Object ID)
curl "https://api.knack.com/v1/objects/object_X" \
  -H "X-Knack-Application-Id: $KNACK_APP_ID" \
  -H "X-Knack-REST-API-Key: $KNACK_API_KEY" | jq '.fields[] | {key, name, type}'

# Or hit a View directly to see the shape of returned records
curl "https://api.knack.com/v1/scenes/scene_X/views/view_Y/records?rows_per_page=1" \
  -H "X-Knack-Application-Id: $KNACK_APP_ID" \
  -H "X-Knack-REST-API-Key: $KNACK_API_KEY" | jq '.records[0]'
```

## Typical HTI program areas (verify Object IDs in the live builder)

| Program area | Likely Object | Notes |
|--------------|--------------|-------|
| **Laptop inventory** | `object_<X>` | 3,500+ records — pagination required |
| **Participants** | `object_<X>` | Beneficiary records, contains PII |
| **Donors / funders** | `object_<X>` | Includes grant funders (NCDIT etc.) |
| **Events / classes** | `object_<X>` | Digital Champion training sessions |
| **Volunteer roster** | `object_<X>` | Has check-in capability |
| **Reports / submissions** | `object_<X>` | NCDIT submission tracking |

**To resolve the actual Object IDs:** open the Knack builder → Database → Objects panel → grab the slug from URL.

## Common field types

- `short_text` — names, IDs
- `paragraph_text` — notes
- `email`, `phone`, `address` — structured types (don't treat as plain strings; they have sub-fields like `.email`, `.formatted`, `.street1`)
- `connection` — foreign-key relationships (returns array of `{id, identifier}`)
- `date_time` — ISO format
- `boolean` — `Yes`/`No` strings, NOT booleans
- `multiple_choice` — string or array depending on Single/Multi config

## Filter syntax (URL-encoded JSON)

```javascript
const filters = {
  match: 'and',
  rules: [
    { field: 'field_123', operator: 'is', value: 'Active' },
    { field: 'field_456', operator: 'higher than', value: '2025-01-01' }
  ]
};
const url = `...?filters=${encodeURIComponent(JSON.stringify(filters))}`;
```

Common operators: `is`, `is not`, `is blank`, `is not blank`, `contains`, `does not contain`, `higher than`, `lower than`, `is during the previous`, `is today`.

## Don't

- **Don't dump donor / participant PII** to plain CSV without [[knack-data-cleaner]] running first
- **Don't share unhashed user tokens** in logs or messages
- **Don't bypass [[knack-pagination]]** even if the current count is under 1,000 — counts grow

## Pairs with
- [[knack-auth]] — first call always
- [[knack-reader]] — actual read mechanics
- [[knack-pagination]] — for any "all of X" pull
- [[knack-filter-sort]] — when filtering more than 1-2 fields
- [[knack-cache-optimizer]] — to stay under 10 req/sec
- [[knack-exporter]] — when the destination is a report
- [[hti-grant-cycle]] — when the destination is a grant submission
