# Telegram landing page V1

A static landing page for a Meta Traffic campaign. The page records a Meta Pixel `PageView` on load and a custom `TelegramClick` when someone manually clicks **Join Telegram**. A click does not confirm that the person joined a channel.

## Live deployment and verification

Live URL: https://dark-wind-4e8c.edudot1234.workers.dev/

The site is live on a Cloudflare Workers `workers.dev` address. This differs from the original Cloudflare Pages plan, but serves the same static landing page. On 2026-10-04, the owner confirmed the live page worked and provided a Meta Events Manager **Test Events** screenshot showing `PageView` and `TelegramClick` as **Processed**. The screenshot also showed `SubscribedButtonClick` as **Automatically logged**. That extra event does not confirm a Telegram join and should not be used as the campaign's CTA metric. The `PageView` row was labelled **Custom event** in Meta's screenshot; the source code calls `fbq('track', 'PageView')`.

Campaign destination example:

```text
https://dark-wind-4e8c.edudot1234.workers.dev/?utm_source=meta&utm_medium=paid_social&utm_campaign=telegram_v1&utm_content=creative_1
```

## Before using it for ads

1. The channel URL is the `href` on `#telegram-link` in `index.html`. It currently uses the invite link supplied for this campaign; update it there if the invite link changes.
2. The brand and supporting description in `index.html` use the channel name and copy supplied for this campaign. Review the headline and disclaimer before launch.
3. The Meta Pixel ID is `1411019554494516` in `index.html`. Update both the JavaScript initialization and the `noscript` image URL if the Pixel changes.
4. Confirm that your site notice and privacy information meet the requirements that apply to your campaign.

## Deploy updates from Git

The live site is a Cloudflare Worker. The repository root contains `wrangler.jsonc`, which targets the existing `dark-wind-4e8c` Worker and serves this directory as static assets. `.assetsignore` limits the public assets to `index.html`, `style.css`, and `script.js`.

To connect the existing Worker, open **Workers & Pages** in Cloudflare, select `dark-wind-4e8c`, then go to **Settings → Builds → Connect**. Select the GitHub or GitLab repository containing these files, choose the production branch, use the repository root as the build root, leave the build command empty, and use `npx wrangler deploy` as the deploy command. Confirm the Worker name in Cloudflare matches `wrangler.jsonc` before saving. A push to the selected production branch should then build and deploy the changed files to the same `workers.dev` address. The site itself has no build framework or runtime dependencies.

After each deployment, check the public URL with campaign parameters such as `?utm_source=meta&utm_medium=paid_social&utm_campaign=telegram_v1&utm_content=creative_1`. The page leaves these parameters in the address bar, so they remain part of the page URL available to the Pixel. In Meta Events Manager, use **Test Events** to confirm `PageView` appears on page load and `TelegramClick` appears only after a manual CTA click. Test with browser extensions that block tracking disabled.

The page does not auto-redirect or claim to track Telegram membership.
