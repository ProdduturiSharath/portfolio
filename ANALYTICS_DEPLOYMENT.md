# Analytics deployment and rollback

This file documents the manual GitHub workflow for the consent-gated GA4 update. The coding environment does not push to GitHub; run the commands below from a terminal that is authenticated to `ProdduturiSharath/portfolio`.

## Before publishing

1. Create or use a GitHub authentication method in your own terminal.
2. Verify that the remote is the intended repository:

   ```bash
   git remote -v
   ```

3. Confirm the working tree contains the analytics update and that the local main branch is based on the current live source.
4. Do not share a password, access token, recovery code, or private key in chat.

## Recommended GA4 account settings

Before deploying, open the GA4 property settings and use these values:

1. **Google Signals:** leave disabled.
2. **Advertising features/personalization:** leave disabled and do not link Google Ads.
3. **Enhanced measurement:** turn it off for this portfolio. This site already sends a small, explicit event allowlist. Disabling enhanced measurement avoids automatic outbound-link and file-download events that could expose a `mailto:` URL or create duplicate résumé events. Standard page-view collection is configured by the site after consent.
4. **Data sharing settings:** use the most restrictive choices you prefer; turning off optional sharing keeps collected Analytics data limited to providing and maintaining the service.
5. **Data retention:** 14 months is a reasonable maximum for this portfolio; 2 months is also available.

## Preserve the analytics-free versions

These references are already prepared locally:

| Branch | Commit | Preserves |
|---|---|---|
| `backup/pre-analytics` | `02d6f351d414c2fcd120761b9514cf7e1c45a628` | Current source without analytics |
| `backup/pre-analytics-deployment` | `1136fc05be887aa6c3cc10e86c1d077fc40e8e72` | Current deployed build without analytics |

From the app repository root, push both backups first:

```bash
git push origin backup/pre-analytics backup/pre-analytics-deployment
```

Check them on GitHub before continuing:

```text
https://github.com/ProdduturiSharath/portfolio/tree/backup/pre-analytics
https://github.com/ProdduturiSharath/portfolio/tree/backup/pre-analytics-deployment
```

## Commit and push the analytics update

Run these commands only after the local tests pass:

```bash
git status
git diff --check
git add .
git commit -m "Add consent-gated portfolio analytics"
git push origin main
```

The Measurement ID is intentionally in the frontend source. It identifies the GA4 web stream; it is not a password or API secret.

## Publish to GitHub Pages

The existing deployment uses the `gh-pages` branch. From the same app repository root:

```bash
npm install
npm run build
npm run test
npm run deploy
```

`npm run deploy` builds `dist/` and publishes it to `gh-pages`. GitHub Pages then builds the branch. The public URL remains:

```text
https://prodduturisharath.github.io/portfolio/
```

## Verify after deployment

1. Open the live portfolio in a private/incognito window.
2. Confirm the small analytics control appears at the bottom.
3. Before selecting anything, open browser DevTools → Network and confirm there is no request to `googletagmanager.com` or `google-analytics.com`.
4. Select **Not now**. Reload and confirm the prompt does not immediately return and analytics remains blocked.
5. Use **Analytics preferences** in the footer, select **Allow analytics**, and confirm the Google tag loads.
6. Open a project and expand **Detailed architecture**. Open the résumé. These are allowlisted events that should appear in GA4 DebugView/Realtime after processing.
7. Submit a test contact only if you want to verify the existing Formspree flow; do not use real visitor information for testing.

## Roll back the public deployment only

This builds and publishes the saved analytics-free source while leaving the analytics source commit on `main`:

```bash
git switch backup/pre-analytics
npm run build
npm run deploy
git switch main
```

`backup/pre-analytics-deployment` is a browseable copy of the old `gh-pages` output; it is not the branch from which the `npm run deploy` command should be run.

## Roll back the source and public deployment

If the analytics update is the latest commit and you want to undo it in source history without deleting history:

```bash
git switch main
git revert <analytics-commit-sha>
git push origin main
npm run deploy
```

Replace `<analytics-commit-sha>` with the commit shown by `git log --oneline -5`.

To return the source branch exactly to the saved pre-analytics version, use a separate recovery clone or coordinate with anyone else using the repository. Avoid `git reset --hard` on a shared `main` branch unless you intentionally want to rewrite the local branch state.

## Disable analytics without a deployment

Visitors can select **Analytics preferences → Turn off analytics**. That removes this portfolio's GA cookies, disables future collection, and refreshes the page. A full site-wide removal still requires restoring the pre-analytics source and publishing it with the rollback steps above.
