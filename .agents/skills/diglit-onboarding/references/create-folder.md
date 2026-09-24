# Step 4 — Create Drive Folder + Copy Templates + Share

**Status: blocked on service-account access.** See `references/drive.md`
for the "Authentication — ACTION ITEMS" checklist.

## Hard rule — no edits to existing docs

This step only **creates** new folders and **copies** existing files into
them. It must never modify, rename, move, delete, or re-permission an
existing document in the shared drive. See the non-negotiable rule in
`references/drive.md`. If something would require editing an original,
stop and ask — do not proceed.

## Planned flow

1. Authenticate to Google Drive using the service account JSON.
2. Create a folder inside shared drive `0AEAp3smfR2LRUk9PVA`:
   - Name: `<First Name> <Last Name> - Instructor`
   - Parent: shared drive root (or a configured "Instructors" subfolder
     if Dee wants them grouped — confirm).
3. Check idempotency: if a folder with that exact name already exists in
   the shared drive, reuse it instead of creating a duplicate.
4. List files in the template source folder (ID TBD — see `drive.md`).
5. For each template file, call `files.copy` with:
   - `name`: same as source name
   - `parents`: `[newFolderId]`
   - `supportsAllDrives: true`
   - `includePermissionsForView: null` (don't carry over ACLs)
6. Share the new folder with the instructor:
   - `role: writer` (Editor — confirmed by Dee 2026-04-15)
   - `type: user`
   - `emailAddress: <instructor email>`
   - `sendNotificationEmail: false` (Dee's welcome email is the real
     notification; avoid duplicate Gmail noise).
7. Return the folder URL and pass it to step 3 so the tracker records
   the Drive link.
8. Append to `drafts/<slug>/log.md`.

## API requirements

- Scope: `https://www.googleapis.com/auth/drive` (full — copy + permission).
- All requests must include `supportsAllDrives: true` (shared drives
  require this).
- Service account must be a **Content Manager** (or Manager) on shared
  drive `0AEAp3smfR2LRUk9PVA`.

## Idempotency keys

Per-instructor artifacts saved to:
```
drafts/<slug>/drive.json
```
Shape:
```json
{
  "folderId": "1AbCdEf...",
  "folderUrl": "https://drive.google.com/drive/folders/1AbCdEf...",
  "createdAt": "2026-04-15T14:30:00Z",
  "copiedFiles": [
    { "sourceId": "...", "destId": "...", "name": "..." }
  ],
  "sharedWith": ["jane@example.com"]
}
```
If this file exists on re-run, skip folder creation and only add any
new templates that weren't copied last time.

## Open questions

- Which subfolder inside the shared drive holds the template library
  (or is the whole drive the source)?
- Is there an "Instructors" parent folder Dee wants these grouped under,
  or do new folders sit at the shared-drive root?
- Should we also share with Dee and Mark explicitly, or trust shared-
  drive membership to cover them?
