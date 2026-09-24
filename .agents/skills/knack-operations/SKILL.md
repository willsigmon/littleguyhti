---
name: knack-operations
description: Comprehensive Knack API operations for HTI — data extraction, filtering, pagination, caching/rate-limiting, NCDIT compliance reporting, goal tracking, and multi-format exports.
---

# Knack Operations (HTI Master Guide)

## Overview
This skill provides complete operational reference for interacting with the Knack backend for the HUBZone Technology Initiative (HTI), NCDIT Digital Champion Grant reporting, device tracking, and data exports.

---

## 1. Authentication & Rate Limiting

### Authentication Headers
```javascript
// Server-Side / Automated Scripts:
{
  "X-Knack-Application-Id": process.env.KNACK_APP_ID,
  "X-Knack-REST-API-Key": process.env.KNACK_API_KEY,
  "Content-Type": "application/json"
}

// User-Authenticated (View-Level):
{
  "X-Knack-Application-Id": process.env.KNACK_APP_ID,
  "Authorization": userToken,
  "Content-Type": "application/json"
}
```

### Rate Limiting & Caching Rules
- **Limit**: Maximum 10 requests per second.
- **Backoff**: Implement exponential backoff on HTTP 429 (`min(2^attempt * 1000ms, 30000ms)`).
- **Cache Strategy**: Cache static schema and infrequent reference data for 1 hour. Cache query responses for 5–15 minutes during dashboard sessions.

---

## 2. Querying, Filtering & Pagination

### Base Endpoint
`GET https://api.knack.com/v1/objects/{object_key}/records`

### Pagination
- Max records per page: `1000` (`rows_per_page=1000`).
- Always fetch in batches until `records.length < rows_per_page` or `current_page >= total_pages`.

### Filtering Syntax
```json
{
  "match": "and",
  "rules": [
    {
      "field": "field_123",
      "operator": "is",
      "value": "Ready for Donation"
    },
    {
      "field": "field_456",
      "operator": "is after",
      "value": "2026-01-01"
    }
  ]
}
```
*Operators*: `is`, `is not`, `contains`, `does not contain`, `is blank`, `is not blank`, `is greater than`, `is less than`, `is after`, `is before`.

---

## 3. Digital Champion Grant & NCDIT Reporting

### Core Tracked Metrics
1. **Laptops Acquired** (by source & donation stream)
2. **Devices Converted to HTI Chromebooks** (ChromeOS Flex deployment)
3. **Units Ready for Donation**
4. **Devices Presented / Delivered** (by recipient organization/individual)
5. **Devices Discarded / Recycled** (e-waste compliance)
6. **Digital Literacy Training Hours Delivered**

---

## 4. Multi-Format Exports

- **PDF**: Branded reports for NCDIT compliance, board summaries, and quarterly updates.
- **CSV / Excel**: Raw audit exports for financial & inventory reconciliation.
- **JSON**: Machine-readable payloads for Vercel/Next.js live dashboards.
