import L from "leaflet";

import "../images/marker-blue.png";
import "../images/marker-red.png";
import "../images/marker-shadow.png";

const gdosApiUrl = "http://sdi.gdos.gov.pl/wms";

// actual leaflet object
let leafletMap = {};
L.Map.addInitHook(function initLeafletMap() {
  leafletMap = this;
});

let lastSelectedMarker = false;
/**
 * Place dot under currently selected marker (monument).
 */
function selectMarker(lat, lon) {
  // dot under current marker
  if (lastSelectedMarker) {
    leafletMap.removeLayer(lastSelectedMarker);
  }
  lastSelectedMarker = L.circleMarker([lat, lon], {
    radius: 10, // L.circleMarker makes this radius constant (L.circle is relative)
    color: '#FFD700', // golden color
    fillColor: '#000000',
    fillOpacity: 0.5
  }).addTo(leafletMap);
}

let lastUserMarker = false;
/**
 * Place a dot/marker for user's current position.
 */
function userPositionMarker(lat, lon) {
  // dot under current marker
  if (lastUserMarker) {
    leafletMap.removeLayer(lastUserMarker);
  }
  lastUserMarker = L.circleMarker([lat, lon], {
    radius: 7,
    color: '#000000',
    fillColor: '#FFD700',
    fillOpacity: 0.5
  }).addTo(leafletMap);
}

const MapService = versionService => {
  const map = getMapInstance({ forceMapState: false });

  const service = {
    clearMarkers,
    getMap: () => map,
    getMapIcon,
    selectMarker,
    userPositionMarker,
    showNature
  };

  return service;

  // functions

  function clearMarkers() {
    map.markers = {};
    map.highlight = null;
    return true;
  }

  function getMapIcon(options) {
    const iconUrl = `assets/images/marker-${
      options && options.type ? "red" : "blue"
    }.png`;
    return {
      iconUrl,
      shadowUrl: "assets/images/marker-shadow.png",
      iconSize: [29, 41],
      shadowSize: [41, 41],
      iconAnchor: [15, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [0, -43]
    };
  }

  function getMapInstance(options) {
    return angular.extend(
      {
        markersWatchOptions: {
          doWatch: true,
          isDeep: false,
          individual: {
            doWatch: false,
            isDeep: false
          }
        },
        center: {
          lat: 52.093,
          lng: 19.468,
          zoom: 6
        },
        markers: {},
        highlight: null,
        events: {
          map: {
            enable: ["dragend", "zoomend", "click"],
            logic: "emit"
          },
          markers: {
            enable: ["click", "mouseover", "mouseout"]
          }
        },
        layers: {
          baselayers: {
            wiki: {
              name: "Wikimedia Maps",
              type: "xyz",
              url: "//maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
              layerOptions: {
                subdomains: ["a", "b", "c"],
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
                continuousWorld: true,
                maxNativeZoom: 18,
                maxZoom: 21
              }
            },
            osm: {
              name: "OpenStreetMap",
              type: "xyz",
              url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              layerOptions: {
                subdomains: ["a", "b", "c"],
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
                continuousWorld: false,
                maxNativeZoom: 19,
                maxZoom: 21
              }
            }
          },
          overlays: {
            pins: {
              name: "Markers",
              type: "markercluster",
              visible: true,
              layerOptions: {
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                maxClusterRadius: zoom => 130 - zoom * 5,
                animate: false,
                iconCreateFunction: cluster => {
                  const version = versionService.getVersion();
                  return new L.DivIcon({
                    html: `<div><span>${cluster.getChildCount()}</span></div>`,
                    className: `marker-cluster marker-cluster-small marker-cluster--${version}`,
                    iconSize: new L.Point(40, 40)
                  });
                }
              }
            },
            pinsMissing: {
              name: "MissingMarkers",
              type: "markercluster",
              visible: true,
              layerOptions: {
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                maxClusterRadius: zoom => 130 - zoom * 5,
                animate: false,
                iconCreateFunction: cluster => {
                  const version = versionService.getVersion();
                  return new L.DivIcon({
                    html: `<div><span>${cluster.getChildCount()}</span></div>`,
                    className: `marker-cluster marker-cluster-small marker-cluster--${version} marker-missing`,
                    iconSize: new L.Point(40, 40)
                  });
                }
              }
            },
            gdos: {
              name: "GDOŚ",
              type: "wms",
              url: gdosApiUrl,
              visible: false,
              layerOptions: {
                layers: [
                  "ObszarySpecjalnejOchrony",
                  "ParkiKrajobrazowe",
                  "ParkiNarodowe",
                  "PomnikiPrzyrody",
                  "Rezerwaty",
                  "SpecjalneObszaryOchrony",
                  "ZespolyPrzyrodniczoKrajobrazowe"
                ].join(","),
                format: "image/png",
                styles:
                  "soo$1$3,oso$1$3,zespoly$1$3,pn$1$3,pk$1$3,rez$1$3,pp$1$3",
                transparent: true,
                attribution: "Generalna Dyrekcja Ochrony Środowiska"
              }
            }
          }
        }
      },
      options
    );
  }

  function showNature(flag) {
    map.layers.overlays.gdos.visible = flag;
  }
};

export default () => {
  angular.module("app").factory("mapService", MapService);
};
