# Step 3 — Update Onboarding Tracker

**Status: partial.** Source-of-truth not yet confirmed (Google Sheet vs
Knack — see `references/tracker.md`). Column layout not yet captured.

## Planned flow (Google Sheets path)

1. Authenticate to Sheets using the same service account as Drive.
2. Read row 1 (headers) from sheet `16nUONY_zjeyVs3QoZFWHjwoeyKTZ-J84u_OsCAExgZM`, tab `gid=0`.
3. Find a row whose email column matches the instructor's email.
   - If found: update the appropriate status column (NDA sent, NDA signed,
     W9 received, MOA confirmed) with today's date in ISO format.
   - If not found: append a new row with instructor name, email, and the
     initial status update.
4. Append to `drafts/<slug>/log.md`.

## Status field mapping (placeholder — confirm with Dee)

| Event | Column to write | Value |
|-------|-----------------|-------|
| `nda_sent` | "NDA Sent" | today's date (YYYY-MM-DD) |
| `nda_signed` | "NDA Signed" | date from BoldSign completion webhook/poll |
| `w9_received` | "W9 Received" | today's date |
| `moa_confirmed` | "MOA Confirmed" | today's date |
| `folder_created` | "Drive Folder URL" | full URL to the new folder |

## Sub-commands

The skill should expose these sub-operations so other steps can call them:

- `update-tracker nda_sent <slug>`
- `update-tracker nda_signed <slug> [date]`
- `update-tracker w9_received <slug>`
- `update-tracker moa_confirmed <slug>`
- `update-tracker folder_created <slug> <url>`

## Open questions

- Is this Google Sheet the real source of truth, or is there a Knack
  object too?
- Exact column header strings (so we map without guessing).
- Date format preference — ISO `2026-04-15`, US `04/15/2026`, or a
  timestamp?
