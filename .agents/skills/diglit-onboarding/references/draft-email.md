# Step 1 — Draft Welcome Email for Dee's Review

## Goal

Produce a personalized welcome email for a new DigLit instructor that Dee
can review, tweak if needed, and send. **Never send the email automatically
from this step.** Dee is always the final sender.

## Inputs

From the orchestrator:
- `firstName` (required)
- `lastName` (required)
- `email` (required)
- `startDate` (optional, ISO date)
- `cohort` (optional, e.g. "Spring 2026 — Vance County")

## Output

Write the draft to:
```
~/.claude/skills/diglit-onboarding/drafts/<slug>/welcome-email.md
```

`<slug>` = `<firstname>-<lastname>` lowercased, spaces → `-`
(e.g. `jane-doe`).

The file must contain BOTH a `Subject:` line and a body, in this shape:

```markdown
---
to: jane@example.com
from: Deirdre Greene <dgreene@hubzonetech.org>
cc: Mark Williams <mwilliams@hubzonetech.org>
subject: Welcome to DigLit, Jane!
---

<email body here, plain markdown so Dee can paste into Gmail>
```

After writing the file, print the full draft to the chat so whoever
triggered the skill can read it without opening the file. End with:

> Draft saved to `<path>`. Dee — review and send from Gmail when ready.
> Nothing has been sent yet.

Also append a line to `drafts/<slug>/log.md`:
```
<ISO timestamp>  draft-email  OK  welcome-email.md
```

## Email template (adapt, don't copy verbatim)

Keep the HTI brand voice: optimistic, empowering, community-driven. Use
active voice. Keep it warm but professional. Don't use emojis.

```
Subject: Welcome to DigLit, {{firstName}}!

Hi {{firstName}},

Welcome aboard — we're thrilled to have you joining the DigLit team at
the HUBZone Technology Initiative. Your work is going to help bridge the
digital divide for students, families, veterans, and job seekers across
North Carolina, and we couldn't be more excited to have you on it.

Here's what happens next on our side to get you fully set up:

1. **Non-disclosure agreement (NDA)** — In the next day or two you'll
   receive an email from me with a link to sign a short confidentiality
   agreement. It covers HTI's internal program information and materials
   you'll encounter in your role. You can sign electronically right in
   your browser — no printing or scanning.

2. **W9 and ACH form** — Once your training is done and the NDA is signed,
   I'll follow up with the W9 and ACH (direct deposit) forms so we can
   send any payment straight to your account.

3. **MOA** — The Memorandum of Agreement outlining your role and
   expectations will come through shortly after. Mark and I counter-sign
   that one too.

4. **Your instructor folder** — I'm creating a shared Google Drive folder
   for you called "{{firstName}} {{lastName}} - Instructor" inside our
   DigLit Training Resources drive. You'll find copies of our training
   materials, lesson templates, and reference docs there — feel free to
   edit your copies freely; the originals stay protected.

{{#if startDate}}
Your first session is scheduled for {{startDate}}{{#if cohort}} with the
{{cohort}} cohort{{/if}}. We'll circle back with a short orientation call
before then.
{{else}}
Once your paperwork is in, we'll get you on the calendar for orientation
and your first session.
{{/if}}

If you have any questions at any point — about the paperwork, the
program, the community we serve, or anything else — just hit reply.
Mark (mwilliams@hubzonetech.org) and I are both here for you.

Deirdre Greene
DigLit Program Lead
HUBZone Technology Initiative
dgreene@hubzonetech.org
hubzonetech.org
```

## Guardrails

- **Never** send via Gmail API or SMTP from this step. Draft only.
- **Never** auto-fill information you don't have. If `startDate` or
  `cohort` weren't provided, drop those paragraphs — don't invent them.
- **Never** use emojis. Will's global rule.
- **Never** name the tool we use to send e-signatures. The instructor
  doesn't need to know it's BoldSign (or anything else). Describe the
  action in plain language: "a link to sign", "sign electronically",
  "the signing tool we use". Avoid vendor names entirely.
- **Explain the NDA in plain language, accurately.** Describe only what
  the NDA actually protects. As of 2026-04-15, HTI's NDA covers HTI's
  internal program information and materials the instructor encounters
  in their role — it does NOT currently cover learner personal
  information. Don't imply otherwise. If the NDA scope is ever expanded
  (e.g. to cover learner info), update this guardrail and the template
  together.
- **Always** address the instructor by first name in the greeting.
- Keep the email under ~300 words. Dee can expand if she wants.
- No redundant closing taglines. The sign-off flows directly from the
  last paragraph into the signature block.
