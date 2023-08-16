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

https://en.wikipedia.org/wiki/History_of_the_web_browser#Web_browsers_by_year

Development
-----------

### Basic usage

Step. 1. Install & build bundle.
```
npm i
npm run build
```
Step. 2. Deploy / serve.
Link (or copy) `app` folder to a webserver (Apache, Nginx...).

### Watch for changes

For live updates you can use `npm run start` (watching code changes).

### Upgrades
```
npx npm-check-updates -u
npm i
```
