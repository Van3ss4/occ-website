# Self-Hosted Fonts

This folder holds the website's web fonts so the browser loads them from **our own
domain** instead of calling Google. The `@font-face` rules that reference these files
live at the top of [`css/style.css`](../../css/style.css).

## Why self-host instead of using Google Fonts?

The main reason — especially if you don't show a cookie banner — comes down to **GDPR
compliance and privacy law**. Making the external call to Google can get you into legal
trouble; hosting the fonts yourself solves it.

### The core issue: IP addresses are personal data

When a visitor loads the site and their browser calls Google Fonts
(`fonts.googleapis.com`), two things happen automatically:

1. A connection is made directly to Google's servers.
2. The user's IP address is exposed to Google.

Under the EU's **General Data Protection Regulation (GDPR)**, an IP address counts as
*Personally Identifiable Information (PII)*.

### Why the lack of a cookie banner matters

A site without a cookie banner implies you run a **tracking-free** site that doesn't
collect or share personal data without consent. But by forcing the user's browser to
send their IP address to a third party (Google) without prior explicit consent, you
break that premise — and the law.

> **Legal precedent:** In 2022, a German court (LG München I) fined a website owner for
> using Google-hosted fonts. The court ruled that the unauthorized transfer of the
> user's IP address violated the GDPR, specifically because Google is a US-based company
> subject to different surveillance laws.

### Cookies vs. network requests

It's a common misconception that privacy law only applies to *cookies*.

- **Cookies** are data stored on the user's device.
- **GDPR** covers *all* personal-data processing. Fetching a resource from a third-party
  server transmits personal data (the IP address) across the network.

So even if Google never sets a cookie, the mere act of transmitting the IP address
without consent is enough to require a warning or a legal justification.

## Additional benefits of self-hosting

- **Performance control** — no reliance on a third-party server being up and fast. You
  can cache, compress (modern formats like WOFF2), and optimize exactly as you want.
- **No "double connection" delay** — Google Fonts needs two connections: one to
  `fonts.googleapis.com` for the CSS, another to `fonts.gstatic.com` for the files.
  Self-hosting removes that extra negotiation.
- **Reliability** — behind a strict corporate firewall that blocks Google, the fonts
  still load.

## How it's set up here

You don't have to give up the fonts — just download and serve them yourself. Tools like
the [Google Webfonts Helper](https://gwfh.mranftl.com/fonts) make this simple: select
the font, download the `.woff2` files, drop them in this folder, and the `@font-face`
rules in `style.css` do the rest.

### Required files (subset: `latin`, format: `woff2`)

| Filename                   | Font          | Weight          |
| -------------------------- | ------------- | --------------- |
| `space-grotesk-400.woff2`  | Space Grotesk | 400 (Regular)   |
| `space-grotesk-500.woff2`  | Space Grotesk | 500 (Medium)    |
| `space-grotesk-600.woff2`  | Space Grotesk | 600 (SemiBold)  |
| `space-grotesk-700.woff2`  | Space Grotesk | 700 (Bold)      |
| `inter-400.woff2`          | Inter         | 400 (Regular)   |
| `inter-500.woff2`          | Inter         | 500 (Medium)    |
| `inter-600.woff2`          | Inter         | 600 (SemiBold)  |

> The `latin` subset already covers German characters (ä, ö, ü, **ß**). `latin-ext` is
> only needed for extended characters such as ł, ș, č.

Both fonts are licensed under the **SIL Open Font License**, so bundling them with the
site is allowed.
