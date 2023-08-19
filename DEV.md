Mapa dla Wiki Lubi Zabytki
==========================

Ten projekt to mapa dla konkursu Wiki Lubi Zabytki (WLZ), znany także jako Wiki Loves Monuments (WLM) w języku angielskim.

Mapa prezentuje zabytki na mapie, wyświetlając informacje pochodzące z Wikidanych.
Ułatwia również odnajdywanie brakujących zdjęć zabytków oraz przesyłanie zdjęć na Wikimedia Commons.

Projekt może mieć również szersze zastosowanie.
Są na nim ukryte warstwy (m.in. z GDoś), które nie są obecnie używane, 
ale były wstępnie przygotowane w ramach projektu *Wikiwakacje*.  

Support / Wsparcie
------------------

Wspierane są przeglądarki internetowe o wieku nie przekraczającym 5 lat. Przynajmniej na razie wsparcie obejmuje również ostatnią wersję Firefoksa na Windows XP.

Informacja o wersja przeglądarek według lat:
https://en.wikipedia.org/wiki/History_of_the_web_browser#Web_browsers_by_year

Development
-----------

### Basic usage

Step 1: Install & build bundle.
```bash
npm i
npm run build
```
Step 2: Deploy / serve.
Link (or copy) `app` folder to a webserver (Apache, Nginx...).

### Watch for changes

For live updates you can use `npm run start` (watching code changes).

### Upgrades

This commands are for upgrading versions of dependencies (including large versions).
```bash
npx npm-check-updates -u
npm i
```
This is risky in general, but should be fairly safe for Babel and ESlint.
Make sure the build still works after your changes.

### Release
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
