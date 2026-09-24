# Step 2 — Send NDA via BoldSign

**Status: not yet implemented.** Will is handling BoldSign setup (API key,
NDA template ID, signer order). See `references/boldsign.md` for the
config checklist.

## Planned flow

1. Read config from `boldsign.md` + `~/.config/diglit-onboarding/.env`.
   If any required value is missing (API key, template ID), halt with a
   clear message naming what's missing.

2. Call BoldSign API `POST /v1/template/send` with:
   - `templateId`: the saved NDA template
   - `signers`:
     - signer_1: instructor (name + email from orchestrator inputs)
     - counter_signer: Mark Williams (mwilliams@hubzonetech.org)
   - `sender`: Deirdre Greene (dgreene@hubzonetech.org)
   - `title`: `"NDA — {{firstName}} {{lastName}} — DigLit Instructor"`

3. On success, save the returned `documentId` and response shape to:
   ```
   drafts/<slug>/boldsign.json
   ```

4. Immediately call step 3 (update-tracker) to mark **NDA sent = today**.

5. Append to `drafts/<slug>/log.md`.

## Not in scope for v1

- Webhook listener (we poll via `check-nda-status` instead).
- Reminder emails to signers (BoldSign has this built in — configure in
  the template).

## Open questions

- Signer order: sequential (instructor → Mark), parallel, or all-three-
  sequential (Dee → instructor → Mark)?
- Does the template already include Dee's signature baked in, or does
  she also sign on each send?
