Development
===========

Basic usage
-----------

### Install and build

Step 1: Install & build bundle.
```bash
npm i
npm run build
```
Step 2: Deploy / serve.
Link (or copy) `app` folder to a webserver (Apache, Nginx...).

### Watch for changes

For live updates you can use `npm run start` (watching code changes).

Upgrades
--------

This commands are for upgrading versions of dependencies (including large versions).
```bash
npx npm-check-updates -u
npm i
```
This is risky in general, but should be fairly safe for Babel and ESlint.
Make sure the build still works after your changes.

Release
-------
Step 1: Update version in package.json (used for cache busting).

Step 2: Run updates and build.
```bash
npm up
npm run build-prod
```

Step 3: Staging.
Preferably roll out to a test folder first: `/data/project/zabytki/public_html/_test`.

Step 4: Final.
Delete the `assets` folder in `public_html` and upload the new files to `public_html`.
