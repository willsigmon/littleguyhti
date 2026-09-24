# BoldSign Configuration

## Status: owned by Will

Will (will@hubzonetech.org) is handling BoldSign setup. Do not attempt to
call BoldSign APIs until the values below are filled in.

## Required configuration

- [ ] **API key** — store in `~/.config/diglit-onboarding/.env` as
  `BOLDSIGN_API_KEY=...` (chmod 600).
- [ ] **NDA template ID** — once Dee/Will have saved the NDA as a reusable
  template in BoldSign, paste the template ID here.
- [ ] **Signer order** — confirm one of:
  1. Dee sends → instructor signs → Mark counter-signs (sequential), or
  2. Dee + Mark pre-sign the template → instructor signs last, or
  3. All three sign in parallel.

  Current assumption: **option 1** (sequential: instructor first, Mark
  counter-signs after). Confirm with Dee + Mark.

## Webhook vs polling

No webhook infrastructure. The `check-nda-status` sub-skill polls BoldSign
on demand (when Will or Dee runs it) to check whether the NDA has been
signed. For low instructor volume this is fine; if we get more than a few
instructors per month, we can stand up a webhook listener on sigserve.

## Document ID tracking

When the NDA is sent, BoldSign returns a `documentId`. Save it to:
```
~/.claude/skills/diglit-onboarding/drafts/<instructor-slug>/boldsign.json
```
with shape:
```json
{
  "documentId": "...",
  "sentAt": "2026-04-15T14:22:00Z",
  "status": "out_for_signature",
  "signers": [
    { "name": "Jane Doe", "email": "jane@example.com", "role": "signer_1" },
    { "name": "Mark Williams", "email": "mwilliams@hubzonetech.org", "role": "counter_signer" }
  ]
}
```

The tracker updater (step 3) reads this file to know what "NDA sent" /
"NDA signed" means for a given instructor.
