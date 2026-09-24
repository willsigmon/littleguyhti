# Google Drive Configuration

## Shared drive

- **Shared Drive ID**: `0AEAp3smfR2LRUk9PVA`
- **Drive URL**: https://drive.google.com/drive/u/3/folders/0AEAp3smfR2LRUk9PVA

This is the entire shared workspace for DigLit. All folders (training
resources, per-instructor folders, etc.) live **inside** this shared drive.
Files created here are organization-owned — they persist even if a user
account is deprovisioned.

## NON-NEGOTIABLE RULE — do not modify existing documents

> Per Will (2026-04-15): **the skill must NEVER modify, rename, move, or
> delete any existing document inside this shared drive.** Existing docs
> are shared, live references that other people depend on.
>
> If the skill needs write access to any existing document's content, it
> must **copy the document first** and operate on the copy — never the
> original.
>
> This rule applies recursively to every subfolder. When in doubt, copy.

Operations the skill IS allowed to perform:
- Create brand-new folders (e.g. the per-instructor folder).
- **Copy** existing files into those new folders.
- Share the new folders with instructors.
- Read any existing document (view-only when reading is all we need).

Operations the skill is NOT allowed to perform:
- Edit an existing document's content or metadata.
- Rename an existing document or folder.
- Move an existing document out of its current location.
- Delete anything.
- Change permissions on an existing document or folder.

## Template source folder — TO CONFIRM

> **Open question for Dee / Will**: which specific subfolder inside the
> shared drive holds the canonical **DigLit Training Resources templates**
> that should be copied into each new instructor's folder?
>
> We need either the folder name + path, or the folder ID (right-click the
> folder → Get link). Paste it here once confirmed.

Until confirmed, step 4 (`create-folder`) will halt before the copy loop
and ask.

## New instructor folder convention

- **Name**: `<First Name> <Last Name> - Instructor` (e.g. `Jane Doe - Instructor`)
- **Location**: inside the shared drive, at the root level (unless Dee wants
  them grouped under an "Instructors" parent — confirm).
- **Contents**: fresh **copies** of each doc from the template source folder
  (never linked/shortcut — copies, so instructor edits don't touch the originals).

## Sharing (confirmed by Dee on 2026-04-15)

- Instructor role on their own folder: **Editor** (`writer`).
- External addresses allowed (instructors may use personal Gmail).
- Dee and Mark already have access via shared-drive membership — do not
  re-share to them explicitly.
- `sendNotificationEmail: false` — Dee's welcome email is the real
  notification; we don't want duplicate Gmail noise from Drive.

## Authentication — ACTION ITEMS

The skill uses a Google service account.

### What Will does
1. Create or reuse an HTI service account (Google Cloud Console → IAM).
2. Enable the **Google Drive API** and **Google Sheets API** on the project.
3. Download the service account JSON key.
4. Save it to `~/.config/diglit-onboarding/google-sa.json` with `chmod 600`.

### What Dee does (once)
1. Will shares the service account email with Dee (looks like
   `something@hti-...iam.gserviceaccount.com`).
2. Dee opens shared drive `0AEAp3smfR2LRUk9PVA` → **Manage members** →
   adds that email as **Content Manager**.
3. Dee also opens the tracker sheet (`16nUONY_...`) → File → Share → adds
   the same service account email as **Editor**.

### OAuth scopes needed
- `https://www.googleapis.com/auth/drive` — for folder create, file copy,
  and permission grants on new folders.
- `https://www.googleapis.com/auth/spreadsheets` — for tracker updates.

Both scopes are read+write, but the guardrail above restricts us to only
writing on **new** artifacts the skill itself creates.

Until the service account is wired up, steps 3 (tracker) and 4 (folder)
will halt and print these action items.
