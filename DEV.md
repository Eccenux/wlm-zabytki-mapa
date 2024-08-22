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

Important code points
----------------------------------------
`src\services\data.service.js`
  - function getMonuments() -- Contains SPARQL (WD query).
    
`src\components\card\card.html`
  - The monument card on the sidebar.
    
`src\components\map\map.component.js`
  - function getMonuments() -- Final loop to create markers on the map.
  - function transformMonuments() -- Transforms API data for the card component.
    
`src\services\text.service.js`
  - Translations (i18n).

Map changes
----------------------------------------

The map is based on [Leaflet library](https://leafletjs.com/), but there's a catch: it's an Angular Leaflet component, not a standard Leaflet instance.
This means that most operations are not performed on a Leaflet instance using Leaflet methods, but rather on the Angular state.
For example, to change the position, you modify the `vm.map.center` object and then run `$scope.$apply()` when necessary.

However, there is a way to directly access the leaflet instance. You could add this initialization hook:

```js
L.Map.addInitHook(function() {
  // add to controler
  vm.leafletMap = this;
  // add global variable
  window._leafletMap = this;
});
```

Please note that changing the `leafletMap` instance might lead to unexpected effects when Angular state is reapplied.

Adding a marker does work though.
```js
myIcon = L.icon({
    iconUrl: 'assets/images/marker-icon.png',
    shadowUrl: "assets/images/marker-shadow.png",
    iconSize: [29, 41],
    shadowSize: [41, 41],
    iconAnchor: [15, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [0, -43]
});

if (typeof myMarker != 'undefined') {
  myMarker.remove();
}
pos = _leafletMap.getCenter();
myMarker = L.marker(pos, {icon: myIcon})
  .addTo(_leafletMap)
  .bindPopup(`Marker at:<br>${pos}`)
  //.openPopup();
```

Geolocation accuracy
----------------------
Rounding errors for lat/lon vs distance from original lat/lon:
https://pl.wikipedia.org/wiki/Wikipedysta:Nux/test_WLZ_dok%C5%82adno%C5%9B%C4%87_geo-wsp%C3%B3%C5%82rz%C4%99dnych

Calculations:
https://github.com/Eccenux/wlm-zabytki-robocze

Library compatibility
--------------------------

### Leaflet

Seems like leaflet 1.8 (and 1.9) doesn't work with the last markercluster (1.5.3) 
or with the last `angular-leaflet-directive` (0.10.0).

Bug: Włączenie przesuwania mapy w wersji mobilnej #4

Works fine:
```
    "leaflet": "1.5.x",
    "leaflet.markercluster": "1.5.x",
...
    "leaflet": "1.7.x",
    "leaflet.markercluster": "1.5.x",
```

Broken dragging on mobile:
```
    "leaflet": "1.8.x",
    "leaflet.markercluster": "1.5.x",
```
