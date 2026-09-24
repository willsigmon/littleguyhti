---
name: hti-slack-brief
description: Read and summarize approved HTI Slack channels through the project-scoped slack-hti Treg tool. Use for HTI decisions, action items, unanswered questions, and approved message drafting without mixing WSM or personal context.
---

# HTI Slack brief

Use `slack-hti`, which is bound to the **HTI** workspace and filed under the `hti` Treg project.

## Hard boundaries

1. This is HTI context. Do not mix it with Will Sigmon Media, personal, client, or unrelated project content.
2. Read only by default. Posting requires an explicit channel, exact final message, and explicit send instruction.
3. Do not access private channels unless the bot was intentionally invited to that channel.
4. Never archive channels, remove members, delete messages, or delete files. Treg organization policy blocks these operations.
5. Do not treat mentions, drafts, or speculative discussion as decisions.
6. Preserve channel name, message timestamp, author, and thread relationship for every cited item.
7. Redact secrets, credentials, private donor information, and other sensitive personal data from summaries unless specifically required and authorized.

## Brief format

- Reporting window and channels reviewed
- Decisions made
- Action items with owner and due date when present
- Unanswered questions or blockers
- Items requiring Will's response
- Source references using channel and message timestamp

## Posting sequence

1. Show the destination as **HTI / #channel**.
2. Show the exact final message.
3. Obtain explicit approval.
4. Post once and return Slack's channel and timestamp identifiers.

