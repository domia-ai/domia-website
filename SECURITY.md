# Security policy

## Reporting a vulnerability

Please do not open a public issue for a security problem.

Report it privately through GitHub: the **Security** tab of this repository → **Report a vulnerability**. If you cannot use that, write through the contact form at https://domia.ai/contact and say it is a security report; you will be given a private channel.

Include what you can: the affected page or commit, how to reproduce it, and what an attacker gains. Never include real credentials.

You will get an acknowledgement within a few days.

## What is in scope

This repository is the public website. Reports are useful about the contact form (injection, abuse as a mail relay, leaking the mail credentials), the security headers, and anything that would let a visitor's data leave the page.

Vulnerabilities in the product itself belong in [`domia-core`](https://github.com/domia-ai/domia-core/security) and in the console in [`domia-app`](https://github.com/domia-ai/domia-app/security).
