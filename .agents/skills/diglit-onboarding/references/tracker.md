# Onboarding Tracker — Google Sheets (only)

**Source of truth: the Google Sheet below. Knack is not involved in this
pipeline at all — do not write to Knack.**

https://docs.google.com/spreadsheets/d/16nUONY_zjeyVs3QoZFWHjwoeyKTZ-J84u_OsCAExgZM/edit?gid=0#gid=0

- **Spreadsheet ID**: `16nUONY_zjeyVs3QoZFWHjwoeyKTZ-J84u_OsCAExgZM`
- **Sheet GID**: `0` (first tab — confirm tab name once we read row 1)

## Status fields the automation writes

| Event | Column to write | Value | Source |
|-------|-----------------|-------|--------|
| `nda_sent` | NDA Sent column | today (YYYY-MM-DD) | step 2 success |
| `nda_signed` | NDA Signed column | date from BoldSign completed status | `check-nda-status` poll |
| `w9_received` | W9 Received column | today (YYYY-MM-DD) | manual trigger |
| `ach_received` | ACH Received column | today (YYYY-MM-DD) | manual trigger |
| `moa_confirmed` | MOA Confirmed column | today (YYYY-MM-DD) | manual trigger |
| `folder_created` | Drive Folder URL column | full folder URL | step 4 success |

## Row matching

Rows are keyed by **instructor email** (names can collide; emails don't).
- If a row with that email exists → update the matching status column in place.
- If no row exists → append a new row with name + email + the initial status.

## Authentication

Same Google service account as Drive (see `drive.md`). Additional scope:
`https://www.googleapis.com/auth/spreadsheets` (read/write).

The service account email must be added as an **Editor** on this sheet:
File → Share → paste the `...gserviceaccount.com` address.

## Open questions (do not guess — ask Dee or Will)

- [ ] Exact column header strings (need row 1 content to map status → column letter).
- [ ] Date format Dee prefers: ISO (`2026-04-15`), US (`04/15/2026`), or timestamp?
- [ ] Tab name — is `gid=0` the only tab, and what's it called?
