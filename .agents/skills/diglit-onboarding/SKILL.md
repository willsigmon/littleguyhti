---
name: diglit-onboarding
description: Run the DigLit instructor onboarding pipeline — draft welcome email for Dee's review, send NDA via BoldSign, update the onboarding tracker, and create the instructor's shared Drive folder. Use when a new DigLit instructor needs to be onboarded.
---

# DigLit Instructor Onboarding

End-to-end routine for onboarding a new DigLit instructor at HUBZone Technology Initiative (HTI). Owned by Deirdre ("Dee") Greene; Mark Williams counter-signs NDAs.

## When to use this skill

Invoke when Will or Dee says any of:
- "Onboard a new DigLit instructor"
- "New instructor — Jane Doe, jane@example.com"
- "Start onboarding for [name]"

Required inputs to proceed:
1. Instructor first name + last name
2. Instructor email
3. (Optional) Phone, start date, assigned DigLit program/cohort

If any required input is missing, ask before starting.

## The four steps

Run these in order. Each is documented in its own reference file. Read the
referenced file immediately before executing that step.

| # | Step | Reference file |
|---|------|----------------|
| 1 | Draft welcome email for Dee's review | `references/draft-email.md` |
| 2 | Send NDA via BoldSign | `references/send-nda.md` |
| 3 | Update the onboarding tracker | `references/update-tracker.md` |
| 4 | Create Drive folder + copy templates + share | `references/create-folder.md` |

After each step, report status to the user before moving to the next.

## Static context (don't hardcode anywhere else — read from here)

- `references/contacts.md` — Dee, Mark, and HTI team email addresses
- `references/drive.md` — shared drive + template folder IDs
- `references/boldsign.md` — NDA template ID + signer flow (owned by Will)
- `references/tracker.md` — tracker schema (Sheets or Knack field IDs)

## Output directory

Drafts, logs, and per-instructor artifacts go to:
```
~/.Codex/skills/diglit-onboarding/drafts/<instructor-slug>/
```
where `<instructor-slug>` is `firstname-lastname` lowercased, e.g. `jane-doe`.

## Operating principles

- **Dee reviews, then sends.** Nothing goes to an instructor without Dee's
  explicit approval. Step 1 produces a draft, not a sent message.
- **Never modify existing Drive docs.** The shared drive holds live,
  multi-user references. The skill may read them and copy them, but must
  not edit, rename, move, delete, or re-permission any pre-existing file
  or folder. See `references/drive.md` for the full rule.
- **Only Sheets, not Knack, for the tracker.** Knack is not part of this
  pipeline. All status writes go to the Google Sheet in `references/tracker.md`.
- **No guessing at IDs.** If a field ID, template ID, or folder ID isn't in
  `references/`, stop and ask — never assume.
- **Idempotent.** Re-running for the same instructor should not duplicate
  Drive folders, re-send NDAs, or overwrite tracker rows. Check for existing
  state first.
- **Log everything.** Append each step's outcome (timestamp, status, IDs
  returned) to `drafts/<instructor-slug>/log.md`.
