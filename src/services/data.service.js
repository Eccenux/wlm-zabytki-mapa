/* eslint-disable no-console */
/* eslint-disable angular/json-functions */
/* eslint-disable angular/log */
import proj4 from "proj4";
import { downAccuracy, ceilAccuracy } from '../lib/MapHelpers';

const DataService = ($http) => {
  let lastCoord = {};

  const overpassApiUrl = "http://overpass-api.de/api/interpreter";
  const puwgProjection =
    "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs";

  const service = {
    getArt,
    getCity,
    getMonuments,
    getNature,
    getLastCoord
  };

  // cache
  const previousMonuments = {
    query: '',
    data: '',
  };

  return service;

  // functions

  function getArt(bounds, options) {
    const b = bounds;
    const bbox = [
      b.southWest.lat,
      b.southWest.lng,
      b.northEast.lat,
      b.northEast.lng
    ].join(",");

    return $http(
      angular.extend(
        {},
        {
          method: "POST",
          url: overpassApiUrl,
          data: `[out:json][timeout:25];
        (
          node["historic"="wayside_shrine"](${bbox});
          node["historic"="memorial"](${bbox});
          node["historic"="monument"](${bbox});
          node["man_made"="cross"](${bbox});
          node["tourism"="artwork"](${bbox});
        );
      out body; >; out skel qt;`
        },
        options
      )
    );
  }

  function getCity(name) {
    return $http({
      method: "GET",
      url: "https://nominatim.openstreetmap.org/search",
      params: {
        format: "json",
        countrycodes: "pl",
        city: name,
        dedupe: 1
      }
    });
  }

  /**
   * Monuments API query.
   * 
   * TODO: should optimize calls to this by using same bounds for many users.
   * WD can cache things, but the cache will not work even with micro-changes (such as adding 0 at the of a coordinate).
   * Maybe use S2 cells?
   * https://s2geometry.io/devguide/s2cell_hierarchy.html
   * Or just cut manually.
   * 
   * @param {Object} bounds Map rectangle corners.
   * @param {Object} options Optional, extra API call options.
   * @returns 
   */
  function getMonuments(bounds, options) {
    const b = bounds;

    // might increase performance (cache hits)
    const digits = 2;
    const cornerWest = `Point(${downAccuracy(b.southWest.lng, digits)} ${downAccuracy(b.southWest.lat, digits)})`;
    const cornerEast = `Point(${ceilAccuracy(b.northEast.lng, digits)} ${ceilAccuracy(b.northEast.lat, digits)})`;
    console.log(`Full(${b.southWest.lng} ${b.southWest.lat})`);
    console.log(`Full(${b.northEast.lng} ${b.northEast.lat})`);
    console.log(cornerWest);
    console.log(cornerEast);

    /*
      P1435 = status dobra kultury
        wd:Q29940414	zabytek nieruchomy -- raczej wojewódzki rejestr
        wd:Q21438156	zabytek w Polsce -- bardziej ogólne, można pominąć
      
      # filtr do nieruchomych
      ?item wdt:P1435 wd:Q29940414 .
      # pobranie statusu (można potem filtrować lub wyświetlić na liście zabytków)
      ?item wdt:P1435 ?status .

      # filtr podstawowy (istnienie P1435)
      ?item p:P1435 ?monument .

      # adres do nawigacji (zazwyczaj w formie: /Ulica nr/,
      # ale też: "ul. Spacerowa 10,45-094 Opole")
      OPTIONAL { ?item wdt:P6375 ?address. }
    */
    const query = `SELECT ?item ?itemLabel ?townLabel ?image ?coord ?category ?townCategory ?adminCategory ?address WHERE {
      SERVICE wikibase:box {
      ?item wdt:P625 ?coord .
        bd:serviceParam wikibase:cornerWest "${cornerWest}"^^geo:wktLiteral .
        bd:serviceParam wikibase:cornerEast "${cornerEast}"^^geo:wktLiteral .
      }
      OPTIONAL { ?item wdt:P131 ?town . }
      OPTIONAL { ?item wdt:P131 ?town . ?town wdt:P373 ?townCategory }
      OPTIONAL { ?item wdt:P131 ?town . ?town wdt:P131 ?admin . ?admin wdt:P373 ?adminCategory }
      OPTIONAL { ?item wdt:P18 ?image . }
      ?item wdt:P1435 wd:Q29940414 .
      FILTER NOT EXISTS { ?item wdt:P31 wd:Q19860854 }
      OPTIONAL { ?item wdt:P31 ?type }
      OPTIONAL { ?item wdt:P373 ?category }
      OPTIONAL { ?item wdt:P6375 ?address. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "pl,en" }
    }
    LIMIT 2000`.replace(/ {2,}/g, " ");

    // attempt interal cache (avoid duplicate requests)
    if (previousMonuments.query === query) {
      console.log('getMonuments: resolve from cache');
      return Promise.resolve(previousMonuments.data);
    }

    // load from WD
    return $http(
      angular.extend(
        {},
        {
          method: "GET",
          url: "https://query.wikidata.org/sparql",
          params: { query }
        },
        options
      )
    ).then((data) => {
      // save interal cache
      previousMonuments.query = query;
      previousMonuments.data = data;
      return data;
    });
  }

  function getNature(coords) {
    lastCoord = coords;
    const coor = proj4("WGS84", puwgProjection, [coords.lng, coords.lat]);

    return $http({
      method: "GET",
      url: "gdos.php",
      params: { x: coor[0], y: coor[1] }
    });
  }

  function getLastCoord() {
    return lastCoord;
  }
};

export default () => {
  angular.module("app").factory("dataService", DataService);
};
